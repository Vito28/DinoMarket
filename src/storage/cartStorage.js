import { readStorage, removeStorage, writeStorage } from "./localStorage";
import { getActiveUserId } from "./userStorage";

const CART_KEY_PREFIX = "ecom.cart";
const LEGACY_CART_LIST_KEY = "stored_products";
const LEGACY_CART_STATE_KEY = "ecom.cart";

const CART_EVENT_KEY = "cart:updated";

const defaultCartState = {
  items: [],
};

const sanitiseQuantity = (value) => {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return 1;
  }

  if (parsed > 100) {
    return 100;
  }

  return Math.floor(parsed);
};

const normaliseItem = (candidate) => {
  if (!candidate) {
    return null;
  }

  const productId = Number(candidate.productId ?? candidate.id);

  if (!Number.isFinite(productId)) {
    return null;
  }

  const shopId = Number(candidate.shopId ?? candidate.shop?.id);

  const quantity = sanitiseQuantity(candidate.quantity ?? candidate.quantities ?? 1);
  const note =
    typeof candidate.note === "string"
      ? candidate.note
      : typeof candidate.addNote === "string"
      ? candidate.addNote
      : "";

  return {
    productId,
    shopId: Number.isFinite(shopId) ? shopId : null,
    quantity,
    note,
  };
};

const collectUniqueItems = (items) => {
  const uniqueMap = new Map();

  items.forEach((item) => {
    const normalised = normaliseItem(item);
    if (!normalised) {
      return;
    }

    uniqueMap.set(normalised.productId, normalised);
  });

  return Array.from(uniqueMap.values());
};

const getCartStorageKey = () => {
  const activeUserId = getActiveUserId();
  return `${CART_KEY_PREFIX}.${activeUserId ?? "guest"}`;
};

const emitCartUpdate = (state) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(CART_EVENT_KEY, {
      detail: {
        key: getCartStorageKey(),
        items: state.items,
      },
    })
  );
};

const readCartState = () => readStorage(getCartStorageKey(), null);

const writeCartState = (state) => {
  writeStorage(getCartStorageKey(), state);
  emitCartUpdate(state);
  return state;
};

const migrateLegacyCart = () => {
  const legacyStructured = readStorage(LEGACY_CART_STATE_KEY, null);
  if (legacyStructured && Array.isArray(legacyStructured.items)) {
    const migrated = {
      items: collectUniqueItems(legacyStructured.items),
    };
    writeCartState(migrated);
    removeStorage(LEGACY_CART_STATE_KEY);
    return migrated;
  }

  const legacyItems = readStorage(LEGACY_CART_LIST_KEY, []);
  if (!legacyItems || legacyItems.length === 0) {
    return null;
  }

  const migratedItems = legacyItems.map((item) => {
    const persistedQuantity = readStorage(`quantities_${item.id}`, null);
    const persistedNote = readStorage(`addNote_${item.id}`, "");

    let quantity = item.quantities ?? 1;

    if (Array.isArray(persistedQuantity) && persistedQuantity.length > 0) {
      quantity = persistedQuantity[0];
    } else if (typeof persistedQuantity === "number") {
      quantity = persistedQuantity;
    }

    return {
      productId: item.id,
      shopId: item.shopId,
      quantity,
      note: typeof persistedNote === "string" ? persistedNote : "",
    };
  });

  const cartState = {
    items: collectUniqueItems(migratedItems),
  };

  writeCartState(cartState);

  removeStorage(LEGACY_CART_LIST_KEY);
  legacyItems.forEach((item) => {
    removeStorage(`quantities_${item.id}`);
    removeStorage(`addNote_${item.id}`);
  });
  removeStorage("price_cart");

  return cartState;
};

const ensureCartState = () => {
  const existing = readCartState();

  if (existing && Array.isArray(existing.items)) {
    return {
      items: collectUniqueItems(existing.items),
    };
  }

  const migrated = migrateLegacyCart();
  if (migrated) {
    return migrated;
  }

  return writeCartState({ ...defaultCartState });
};

const persistCartState = (items) => {
  const nextState = {
    items: collectUniqueItems(items),
  };

  return writeCartState(nextState);
};

export const getCartItems = () => {
  const { items } = ensureCartState();
  return items;
};

export const getCartItem = (productId) => {
  const numericId = Number(productId);
  if (!Number.isFinite(numericId)) {
    return null;
  }

  return getCartItems().find((item) => item.productId === numericId) ?? null;
};

export const upsertCartItem = ({ productId, shopId, quantity = 1, note = "" }) => {
  const items = getCartItems();
  const nextItems = [...items];
  const existingIndex = nextItems.findIndex((item) => item.productId === Number(productId));
  const incomingQuantity = sanitiseQuantity(quantity);

  const updatedItem = {
    productId: Number(productId),
    shopId: Number.isFinite(Number(shopId)) ? Number(shopId) : null,
    quantity: incomingQuantity,
    note: typeof note === "string" ? note : "",
  };

  if (existingIndex >= 0) {
    const existingItem = nextItems[existingIndex];
    const mergedQuantity = sanitiseQuantity(existingItem.quantity + incomingQuantity);

    nextItems[existingIndex] = {
      ...existingItem,
      ...updatedItem,
      quantity: mergedQuantity,
    };
  } else {
    nextItems.push(updatedItem);
  }

  return persistCartState(nextItems);
};

export const updateCartItemQuantity = (productId, quantity) => {
  const items = getCartItems();
  const nextItems = items.map((item) =>
    item.productId === Number(productId)
      ? { ...item, quantity: sanitiseQuantity(quantity) }
      : item
  );

  return persistCartState(nextItems);
};

export const adjustCartItemQuantity = (productId, delta) => {
  const item = getCartItem(productId);
  const nextQuantity = sanitiseQuantity((item?.quantity ?? 1) + delta);
  if (item) {
    return updateCartItemQuantity(productId, nextQuantity);
  }

  return upsertCartItem({ productId, quantity: nextQuantity });
};

export const setCartItemNote = (productId, note) => {
  const items = getCartItems();
  const nextItems = items.map((item) =>
    item.productId === Number(productId)
      ? { ...item, note: typeof note === "string" ? note : "" }
      : item
  );

  return persistCartState(nextItems);
};

export const removeCartItem = (productId) => {
  const items = getCartItems();
  const nextItems = items.filter((item) => item.productId !== Number(productId));
  return persistCartState(nextItems);
};

export const setCartItems = (items) => persistCartState(items);

export const clearCart = () => writeCartState({ ...defaultCartState });

export const getCartTotals = (productsCatalog = []) => {
  const catalogMap = new Map(productsCatalog.map((product) => [product.id, product]));
  const items = getCartItems();

  return items.reduce(
    (acc, item) => {
      const product = catalogMap.get(item.productId);
      if (!product) {
        return acc;
      }

      const effectivePrice =
        product.price - product.price * (product.discount_percentage / 100);

      acc.count += item.quantity;
      acc.subtotal += product.price * item.quantity;
      acc.total += effectivePrice * item.quantity;
      return acc;
    },
    { count: 0, subtotal: 0, total: 0 }
  );
};

export const syncCartForActiveUser = () => {
  const state = ensureCartState();
  emitCartUpdate(state);
  return state;
};

export const CART_UPDATED_EVENT = CART_EVENT_KEY;

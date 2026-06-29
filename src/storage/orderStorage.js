import { readStorage, writeStorage } from "./localStorage";

const ORDERS_KEY = "ecom.orders";

const readOrdersMap = () => readStorage(ORDERS_KEY, {});

const writeOrdersMap = (ordersMap) => writeStorage(ORDERS_KEY, ordersMap);

const createOrderId = () => {
  const date = new Date();
  const datePart = date
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "");
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `DM-${datePart}-${randomPart}`;
};

export const getOrdersForUser = (userId) => {
  if (!userId) {
    return [];
  }

  const ordersMap = readOrdersMap();
  return Array.isArray(ordersMap[userId]) ? ordersMap[userId] : [];
};

export const saveOrderForUser = (userId, orderPayload) => {
  if (!userId) {
    return null;
  }

  const ordersMap = readOrdersMap();
  const currentOrders = getOrdersForUser(userId);
  const now = new Date().toISOString();
  const order = {
    id: createOrderId(),
    createdAt: now,
    status: "Dikemas",
    ...orderPayload,
  };

  writeOrdersMap({
    ...ordersMap,
    [userId]: [order, ...currentOrders],
  });

  return order;
};

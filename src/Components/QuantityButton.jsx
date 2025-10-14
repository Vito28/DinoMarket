import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  adjustCartItemQuantity,
  getCartItem,
  upsertCartItem,
  updateCartItemQuantity,
} from "../storage/cartStorage";

const clamp = (value, min, max) => {
  if (Number.isNaN(Number(value))) {
    return min;
  }
  return Math.min(Math.max(Number(value), min), max);
};

const QuantityButton = ({
  productId,
  shopId,
  value,
  defaultValue = 1,
  min = 1,
  max = 100,
  persist = true,
  onQuantityChange,
}) => {
  const initialQuantity = useMemo(() => {
    if (typeof value === "number") {
      return clamp(value, min, max);
    }

    if (persist) {
      const storedItem = getCartItem(productId);
      if (storedItem) {
        return clamp(storedItem.quantity, min, max);
      }
    }

    return clamp(defaultValue, min, max);
  }, [value, persist, productId, min, max, defaultValue]);

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (typeof value === "number") {
      setQuantity(clamp(value, min, max));
    }
  }, [value, min, max]);

  useEffect(() => {
    if (!persist) {
      return;
    }

    const storedItem = getCartItem(productId);
    if (storedItem) {
      updateCartItemQuantity(productId, quantity);
    } else {
      upsertCartItem({ productId, shopId, quantity });
    }
  }, [persist, productId, shopId, quantity]);

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantity);
    }
  }, [quantity, onQuantityChange]);

  const handleDecrease = () => {
    if (persist) {
      adjustCartItemQuantity(productId, -1);
    }
    setQuantity((current) => clamp(current - 1, min, max));
  };

  const handleIncrease = () => {
    if (persist) {
      adjustCartItemQuantity(productId, 1);
    }
    setQuantity((current) => clamp(current + 1, min, max));
  };

  return (
    <div className="d-inline-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center quantity-btn"
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="Kurangi jumlah"
      >
        &minus;
      </button>
      <span className="fw-semibold fs-6 text-center" style={{ minWidth: "2rem" }}>
        {quantity}
      </span>
      <button
        type="button"
        className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center quantity-btn"
        onClick={handleIncrease}
        disabled={quantity >= max}
        aria-label="Tambah jumlah"
      >
        +
      </button>
    </div>
  );
};

QuantityButton.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  shopId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  persist: PropTypes.bool,
  onQuantityChange: PropTypes.func,
};

export default QuantityButton;

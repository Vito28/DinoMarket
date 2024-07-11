import { useState, useEffect } from "react";

const QuantityButton = ({ id, onQuantityChange, type }) => {
  const [a, seta] = useState(() => {
    const storedQuantity = JSON.parse(localStorage.getItem(`quantities_${id}`));
    return type === "cart" ? 1 : storedQuantity[1];
  });
  const [quantity, setQuantity] = useState(() => {
    const storedQuantity = JSON.parse(localStorage.getItem(`quantities_${id}`));
    return type === "cart" ? 1 : storedQuantity[0];
  });

  useEffect(() => {
    const storedQuantity = JSON.parse(localStorage.getItem(`quantities_${id}`));
    if (type === "cart") {
      setQuantity(1);
      seta(1)
    } else {
      setQuantity(storedQuantity ? storedQuantity[0] : 1);
      seta(storedQuantity ? storedQuantity[1] : 1);

    }
  }, [id, type]);

  const onDecrease = () => {
    setQuantity(prev => (prev === 1 ? 1 : prev - 1));
  };

  const onIncrease = () => {
    const storedQuantity = JSON.parse(localStorage.getItem(`quantities_${id}`));
    setQuantity(prev => (type === "cart" ? (prev === 100 ? 100 : prev + 1) : (prev === storedQuantity[1] ? storedQuantity[1] : prev + 1)));
    seta(prev => type == "cart" ? prev + 1 : prev + 0)
    console.log(storedQuantity[1])
    console.log(storedQuantity[0])
  };

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantity);
      localStorage.setItem(`quantities_${id}`, JSON.stringify([quantity, a]));
    }
  }, [quantity, id, onQuantityChange, a]);

  return (
    <div className="add-item">
      <button
        type="button"
        onClick={onDecrease}
        style={{ cursor: quantity === 0 ? "not-allowed" : "pointer" }}
        aria-label="Decrease Quantity"
        disabled={quantity === 1}
      >
        {" "}
        -{" "}
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        style={{ cursor: quantity === 0 ? "not-allowed" : "pointer" }}
        aria-label="Increase Quantity"
        disabled={quantity === 100}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default QuantityButton;

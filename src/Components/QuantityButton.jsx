import { useState, useEffect } from "react"

const QuantityButton = ({ id, onQuantityChange, type }) => {
  const [quantity, setQuantity] = useState(() => {
    return type === "cart" ? 1 : JSON.parse(localStorage.getItem(`quantities_${id}`)) || 1;
  });

  useEffect(() => {
    
    if (onQuantityChange) {
      onQuantityChange(quantity);
    }
  }, [quantity, id, onQuantityChange]);

  const onDecrease = () => {
    setQuantity(prev => quantity === 1 ? 1 : prev - 1);
  }

  const onIncrease = () => {
    setQuantity(prev => quantity === 100 ? 100 : prev + 1);
  }

  return (
    <div className="add-item">
      <button type="button" onClick={onDecrease} style={{ cursor: quantity === 0 ? "not-allowed" : "pointer" }} aria-label="Decrease Quantity" disabled={quantity === 1}> - </button>
      <span>{quantity}</span>
      <button type="button" onClick={onIncrease} style={{ cursor: quantity === 0 ? "not-allowed" : "pointer" }} aria-label="Increase Quantity" disabled={quantity === 100}> + </button>
    </div>
  )
}

export default QuantityButton
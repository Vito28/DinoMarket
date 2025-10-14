import ProductCard from "./ProductCard";

const sampleProducts = [
  {
    id: 1,
    title: "Aurora 60% Mechanical Keyboard",
    images: ["https://via.placeholder.com/320x220?text=Keyboard"],
    price: 150,
    discount_percentage: 20,
    description: "Hot swap mechanical keyboard with RGB lighting.",
    shop: { id: 10, name: "MechaStore" },
  },
  {
    id: 2,
    title: "Nebula Wireless Mouse",
    images: ["https://via.placeholder.com/320x220?text=Mouse"],
    price: 85,
    discount_percentage: 10,
    description: "Ergonomic mouse with 75-hour battery life.",
    shop: { id: 11, name: "ClickLab" },
  },
  {
    id: 3,
    title: "ZenView 27\" 4K Monitor",
    images: ["https://via.placeholder.com/320x220?text=Monitor"],
    price: 399,
    discount_percentage: 15,
    description: "IPS display with HDR support.",
    shop: { id: 12, name: "ScreenHub" },
  },
  {
    id: 4,
    title: "Nimbus Studio Headphones",
    images: ["https://via.placeholder.com/320x220?text=Headphones"],
    price: 220,
    discount_percentage: 25,
    description: "Active noise cancelling with studio tuning.",
    shop: { id: 13, name: "SoundWave" },
  },
];

export default {
  title: "Components/Product Card",
  component: ProductCard,
  argTypes: {
    onProductClick: { action: "product-click" },
  },
};

export const Grid = {
  args: {
    products: sampleProducts,
  },
};

export const Compact = {
  args: {
    products: sampleProducts,
    variant: "compact",
  },
};

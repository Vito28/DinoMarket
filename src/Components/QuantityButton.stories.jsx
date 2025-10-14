import { useState } from "react";
import QuantityButton from "./QuantityButton";

export default {
  title: "Components/Quantity Button",
  component: QuantityButton,
  args: {
    productId: 1,
    shopId: 101,
    persist: false,
    min: 1,
    max: 10,
  },
  argTypes: {
    onQuantityChange: { action: "quantity-change" },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.defaultValue ?? 1);

  return (
    <QuantityButton
      {...args}
      value={value}
      onQuantityChange={(next) => {
        setValue(next);
        args.onQuantityChange?.(next);
      }}
    />
  );
};

export const Playground = {
  render: Template,
  args: {
    defaultValue: 2,
  },
};

export const LimitedStock = {
  render: Template,
  args: {
    defaultValue: 1,
    max: 3,
  },
};

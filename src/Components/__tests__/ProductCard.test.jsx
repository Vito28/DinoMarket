import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../ProductCard";
import { formatCurrency } from "../../utils/format";
import { describe, expect, it, vi } from "vitest";

const createProduct = (overrides = {}) => ({
  id: 1,
  title: "Aurora 60% Mechanical Keyboard",
  images: ["/keyboard.jpg"],
  price: 150,
  discount_percentage: 20,
  description: "Hot swap mechanical keyboard with RGB.",
  shop: {
    id: 10,
    name: "MechaStore",
  },
  ...overrides,
});

describe("ProductCard", () => {
  it("renders product details and discount badge", () => {
    const product = createProduct();

    render(
      <MemoryRouter>
        <ProductCard products={[product]} onProductClick={() => {}} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: `Lihat detail ${product.title}` })
    ).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.shop.name)).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(product.price * 0.8))
    ).toBeInTheDocument();
    expect(screen.getByText("-20%")).toBeInTheDocument();
  });

  it("supports keyboard activation via Enter key", async () => {
    const user = userEvent.setup();
    const product = createProduct();
    const handleClick = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard products={[product]} onProductClick={handleClick} />
      </MemoryRouter>
    );

    const card = screen.getByRole("button", { name: `Lihat detail ${product.title}` });
    card.focus();
    await user.keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalledWith(product);
  });
});

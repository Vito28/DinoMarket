import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkout from "../Checkout";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { clearCartMock } = vi.hoisted(() => ({
  clearCartMock: vi.fn(),
}));

vi.mock("../../storage/cartStorage", () => ({
  clearCart: clearCartMock,
}));

const buildCheckoutPayload = () => ({
  groups: [
    {
      shop: { id: 1, name: "Dino Gadget" },
      items: [
        {
          productId: 99,
          title: "Wireless Headset",
          quantity: 1,
          discount: 15,
          discountedPrice: 85,
          price: 100,
          note: "Warna hitam",
        },
      ],
      totals: {
        quantity: 1,
        discountedTotal: 85,
        savings: 15,
      },
    },
  ],
  summary: {
    items: 1,
    quantity: 1,
    discountedTotal: 85,
    promoDiscount: 0,
    shipping: 0,
    finalTotal: 85,
  },
  promoMessage: "Gratis ongkir diterapkan.",
});

const renderCheckout = (payload = buildCheckoutPayload()) => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/checkout",
          state: payload,
        },
      ]}
    >
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Checkout", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    clearCartMock.mockClear();
  });

  it("disables submit button until form is complete", async () => {
    const user = userEvent.setup();
    renderCheckout();

    const payButton = screen.getByRole("button", { name: /Bayar Sekarang/i });
    expect(payButton).toBeDisabled();

    await user.type(screen.getByLabelText(/Nama penerima/i), "Andi Pratama");
    await user.type(screen.getByLabelText(/Nomor telepon/i), "081234567890");
    await user.type(screen.getByLabelText(/Alamat lengkap/i), "Jl. Mawar No. 10");
    await user.type(screen.getByLabelText(/Kota \/ Kecamatan/i), "Medan");
    await user.type(screen.getByLabelText(/Kode pos/i), "20111");

    expect(payButton).toBeEnabled();
  });

  it("submits checkout data after validation passes", async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.type(screen.getByLabelText(/Nama penerima/i), "Siti Aulia");
    await user.type(screen.getByLabelText(/Nomor telepon/i), "081234567891");
    await user.type(screen.getByLabelText(/Alamat lengkap/i), "Jl. Kenanga No. 5");
    await user.type(screen.getByLabelText(/Kota \/ Kecamatan/i), "Medan");
    await user.type(screen.getByLabelText(/Kode pos/i), "20112");
    await user.click(screen.getByRole("radio", { name: /E-Wallet/i }));

    const payButton = screen.getByRole("button", { name: /Bayar Sekarang/i });
    await user.click(payButton);

    expect(clearCartMock).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("heading", { name: /Pembayaran Berhasil/i })
    ).toBeInTheDocument();
  });
});

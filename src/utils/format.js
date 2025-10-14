const defaultCurrencyOptions = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
};

export const formatCurrency = (value, options = {}) => {
  const mergedOptions = { ...defaultCurrencyOptions, ...options };

  return new Intl.NumberFormat("en-US", mergedOptions).format(
    Number.isFinite(value) ? value : 0
  );
};

export default formatCurrency;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fallbackCatalog from "../data/products.json";

const collectUniqueShops = (products = []) => {
  const uniqueMap = new Map();

  products.forEach((product) => {
    if (!product?.shop?.id) {
      return;
    }

    if (!uniqueMap.has(product.shop.id)) {
      uniqueMap.set(product.shop.id, {
        id: product.shop.id,
        name: product.shop.name,
        rating: product.shop.rating,
      });
    }
  });

  return Array.from(uniqueMap.values());
};

const extractCatalog = (payload) => {
  const products = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.products)
    ? payload.products
    : [];

  if (!products.length) {
    return {
      products: fallbackCatalog,
      shops: collectUniqueShops(fallbackCatalog),
      isFallback: true,
    };
  }

  return {
    products,
    shops: collectUniqueShops(products),
    isFallback: false,
  };
};

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "./",
  }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getCatalog: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery("product.json");

        if (result.error) {
          return { data: extractCatalog([]) };
        }

        return { data: extractCatalog(result.data) };
      },
    }),
  }),
});

export const { useGetCatalogQuery } = catalogApi;

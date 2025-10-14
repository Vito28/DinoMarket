import { useGetCatalogQuery } from "../services/catalogApi";

export const useCatalogData = () => {
  const result = useGetCatalogQuery();

  return {
    products: result.data?.products ?? [],
    shops: result.data?.shops ?? [],
    isFallback: result.data?.isFallback ?? false,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
};

export default useCatalogData;

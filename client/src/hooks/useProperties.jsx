import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const {
    data = [], // 🔥 fallback crítico
    isLoading,
    isError,
    refetch,
  } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;

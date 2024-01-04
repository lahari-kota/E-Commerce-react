import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import apiURLs from "./../services/service";
import request from "../utils/request";

const getProducts = async (payload) => {
  const url = apiURLs.getProducts;
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   };
  return request(url);
};

function useProducts() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: getProducts,
    onSuccess: () => {
      queryCLient.refetchQueries({
        queryKey: ["products"],
      });
    },
  });
}
export default useProducts;

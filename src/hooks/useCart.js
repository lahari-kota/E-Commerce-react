import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import apiURLs from "../services/service";
import request from "../utils/request";

const addToCart = async (payload) => {
  const url = apiURLs.addToCart;
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  return request(url, options);
};

function useCart() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryCLient.refetchQueries({
        queryKey: ["cart"],
      });
    },
  });
}
export default useCart;

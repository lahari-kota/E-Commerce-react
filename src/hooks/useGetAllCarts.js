import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import apiURLs from "../services/service";
import request from "../utils/Request";

const getAllCarts = async (payload) => {
  const url = apiURLs.getAllCarts + `/${payload}`;
  // const options = {
  //   method: "POST",
  //   body: JSON.stringify(payload),
  // };
  return request(url);
};

function useGetAllCarts() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: getAllCarts,
    onSuccess: () => {
      queryCLient.refetchQueries({
        queryKey: ["getAllCartsByUser"],
      });
    },
  });
}
export default useGetAllCarts;

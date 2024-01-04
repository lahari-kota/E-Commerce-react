import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import apiURLs from "./../services/service";
import request from "../utils/request";

const loginUser = async (payload) => {
  const url = apiURLs.loginURL;
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  return request(url, options);
};

function useLogin() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryCLient.refetchQueries({
        queryKey: ["loginUser"],
      });
    },
  });
}
export default useLogin;

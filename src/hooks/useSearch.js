import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import apiURLs from "./../services/service";
import request from "../utils/request";

const search = async (payload) => {
  const url = apiURLs.search + `${payload}`;

  return request(url);
};

function useSearch() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: search,
    onSuccess: () => {
      queryCLient.refetchQueries({
        queryKey: ["search"],
      });
    },
  });
}
export default useSearch;

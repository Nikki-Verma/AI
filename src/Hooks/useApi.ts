import _authHttp from "@/services/_http";
import { X_USER_ID } from "@/utils/constants";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";

export interface Params {
  [key: string]: any;
}

export interface Headers {
  [key: string]: any;
}

const fetcher = async (
  url: string,
  params: Params,
  headers: Headers,
): Promise<any> => {
  const response: AxiosResponse = await _authHttp.get(url, { params, headers });
  return response.data;
};

export const useFetchData = (
  url: string,
  params: Params = {},
  headers: Headers = {},
): UseQueryResult<any, unknown> => {
  const { data }: any = useSession();

  const DefaultHeaders = {
    [X_USER_ID]: data?.user?.details?.id,
  };

  const queryOptions: UseQueryOptions<any, unknown> = {
    queryKey: ["customFetch", url, params, headers, DefaultHeaders],
    queryFn: () => fetcher(url, params, { ...headers, ...DefaultHeaders }),
  };

  return useQuery(queryOptions);
};

export const useMutate = (key: string[], url: string, config: any = {}) => {
  const defaultConfig = {
    "X-User": 0,
  };

  return useMutation({
    mutationKey: key,
    mutationFn: async () => {
      const response = await fetch(url, { ...defaultConfig, ...config });
      return await response.json();
    },
  });
};

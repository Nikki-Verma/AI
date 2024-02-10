import _authHttp from "@/services/_http";
import { getErrorFromApi } from "@/utils/helperFunction";
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
  try {
    const response: AxiosResponse = await _authHttp.get(url, {
      params,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(getErrorFromApi(error));
  }
};

export const useFetchData = (
  url: string,
  params: Params = {},
  headers: Headers = {},
): UseQueryResult<any, unknown> => {
  const { data }: any = useSession();

  const queryOptions: UseQueryOptions<any, unknown> = {
    queryKey: [
      "customFetch",
      url,
      params,
      headers,
      data?.user?.details?.id,
      data?.accessToken,
    ],
    queryFn: () => fetcher(url, params, { ...headers }),
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

import _authHttp from "@/services/_http";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
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
  enabled: boolean = true,
  fetchKey: string = "",
): UseQueryResult<any, unknown> => {
  const { data }: any = useSession();

  const queryOptions: UseQueryOptions<any, unknown> = {
    queryKey: [
      "customFetch",
      fetchKey,
      url,
      params,
      headers,
      data?.user?.details?.id,
      data?.accessToken,
    ],
    queryFn: () => fetcher(url, params, { ...headers }),
    enabled: enabled,
    retry: 0,
  };

  return useQuery(queryOptions);
};

const postData = async (
  url: string,
  payload: UnknownObject,
  params: Params,
  headers: Headers,
): Promise<any> => {
  try {
    const response: AxiosResponse = await _authHttp.post(url, payload, {
      params,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(getErrorFromApi(error));
  }
};

export const usePostData = (key: string[], queryKeys: string[] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: key,
    mutationFn: async ({
      url,
      payload = {},
      params = {},
      headers = {},
    }: {
      url: string;
      payload: UnknownObject;
      params?: Params;
      headers?: Headers;
    }) => {
      try {
        const response: AxiosResponse = await postData(
          url,
          payload,
          params,
          headers,
        );
        return response;
      } catch (error: any) {
        throw new Error(getErrorFromApi(error));
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [...queryKeys] });
    },
  });
};

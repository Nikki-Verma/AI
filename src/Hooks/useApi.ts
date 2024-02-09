import _authHttp from "@/services/_http";
import {
  DUMMY_TENANT_ID,
  PIM_SID,
  X_DEVICE_ID,
  X_TENANT_ID,
  X_USER_ID,
} from "@/utils/constants";
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
  console.log("🚀 ~ data:", data);

  const DefaultHeaders = {
    [X_USER_ID]: data?.user?.details?.id,
    [X_TENANT_ID]: DUMMY_TENANT_ID,
    [PIM_SID]: data?.accessToken,
    [X_DEVICE_ID]: "armaze-web",
  };

  const queryOptions: UseQueryOptions<any, unknown> = {
    queryKey: ["customFetch", url, params, headers, DefaultHeaders, data],
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

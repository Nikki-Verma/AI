import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchData = (key: string[], url: string, config: any = {}) => {
  const defaultConfig = {
    "X-User": 0,
  };

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await fetch(url, { ...defaultConfig, ...config });
      return await response.json();
    },
  });
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

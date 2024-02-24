import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const usePersistedQueryParams = (initialFilters: any, key?: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filters, setFilters] = useState(initialFilters);

  //   // Update URL parameters when filters state changes
  useLayoutEffect(() => {
    const queryParams = new URLSearchParams();

    for (const [key, value] of searchParams?.entries()) {
      queryParams.set(key, value ?? "");
    }

    if (key) {
      queryParams.set(key, filters ?? "");
    } else {
      Object.entries(filters).forEach(([key, value]: any) => {
        queryParams.set(key, value ?? "");
      });
    }

    router.replace(
      pathname + (queryParams.toString() ? `?${queryParams.toString()}` : ""),
    );
  }, [filters]);

  // Update filters state when URL parameters change
  useLayoutEffect(() => {
    if (key) {
      const currentFilterParam = searchParams?.get(key);
      setFilters(currentFilterParam ?? "");
    } else {
      const newFilters: any = {};

      for (const [key, value] of searchParams?.entries()) {
        newFilters[key] = value ?? "";
      }
      setFilters({ ...filters, ...newFilters });
    }
  }, [searchParams]);

  return [filters, setFilters];
};

export default usePersistedQueryParams;

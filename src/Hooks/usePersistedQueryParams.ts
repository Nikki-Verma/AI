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

    if (key) {
      if (filters != undefined && filters != null) {
        queryParams.set(key, filters);
      }
    } else {
      Object.entries(filters).forEach(([key, value]: any) => {
        if (value != undefined && value != null) {
          queryParams.set(key, value);
        } else {
          queryParams.set(key, "undefined");
        }
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
      if (currentFilterParam != "undefined" && currentFilterParam != "null") {
        setFilters(currentFilterParam);
      } else {
        setFilters(undefined);
      }
    } else {
      const newFilters: any = {};

      for (const [key, value] of searchParams?.entries()) {
        if (value != "undefined" && value != "null") {
          newFilters[key] = value;
        } else {
          newFilters[key] = undefined;
        }
      }
      setFilters({ ...filters, ...newFilters });
    }
  }, [searchParams]);

  return [filters, setFilters];
};

export default usePersistedQueryParams;

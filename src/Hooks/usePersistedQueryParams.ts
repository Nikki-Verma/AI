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
      console.log(
        "🚀 ~ useLayoutEffect ~ value existing filter change key:",
        key,
        ", value:",
        value,
      );

      if (value != "undefined" && value != "null") {
        queryParams.set(key, value);
      } else {
        queryParams.set(key, "undefined");
      }
    }

    if (key) {
      console.log(
        "🚀 ~ useLayoutEffect ~ key filter change key:",
        key,
        ", value:",
        filters,
      );

      if (filters != undefined && filters != null) {
        queryParams.set(key, filters);
      } else {
        queryParams.set(key, "");
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
    for (const [key, value] of searchParams?.entries()) {
      console.log(
        "🚀 ~ useLayoutEffect ~ value before route change key:",
        key,
        " , value:",
        value,
      );
    }

    router.replace(
      pathname + (queryParams.toString() ? `?${queryParams.toString()}` : ""),
    );
  }, [filters]);

  // Update filters state when URL parameters change
  useLayoutEffect(() => {
    if (key) {
      const currentFilterParam = searchParams?.get(key);
      console.log(
        "🚀 ~ useLayoutEffect ~ key param change key:",
        key,
        ", value:",
        currentFilterParam,
      );

      if (
        currentFilterParam != "undefined" &&
        currentFilterParam != "null" &&
        !!currentFilterParam
      ) {
        setFilters(currentFilterParam);
      }
    } else {
      const newFilters: any = {};

      for (const [key, value] of searchParams?.entries()) {
        console.log(
          "🚀 ~ useLayoutEffect ~ param change key:",
          key,
          "value :",
          value,
        );
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

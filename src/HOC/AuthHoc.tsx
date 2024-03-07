"use client";

import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { Page_Type } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthHoc(Component: any, PageType = Page_Type.auth) {
  return function AuthHoc(props: any) {
    const { data, status, update }: any = useSession();

    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated" && !data?.user?.details?.id) {
        update();
      }
    }, [status, data]);

    useEffect(() => {
      router.prefetch(`/home`);
      router.prefetch(`/login`);
    }, []);

    if (status === "unauthenticated" && PageType === Page_Type.auth) {
      router.push("/login");
      return <FullScreenLoader />;
    }
    if (status === "authenticated" && PageType === Page_Type.unauth) {
      router.push("/home");
      return <FullScreenLoader />;
    }
    return <Component {...props} />;
  };
}

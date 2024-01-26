function useAuth() {
  // "use client";

  // import { Permissions_Types, PERMISSION_TYPE } from "@/utils/constants";
  // import { Spin } from "antd";
  // import { signOut, useSession } from "next-auth/react";
  // import { useRouter } from "next/navigation";
  // import { useCallback, useEffect } from "react";
  // import styles from './useAuth.module.scss';
  // export interface WithAuthProps {
  //   user: any;
  // }

  // const HOME_ROUTE = "/";
  // const LOGIN_ROUTE = "/login";

  // const ROUTE_ROLES = [
  //   /**
  //    * For authentication pages
  //    * @example /login /register
  //    */
  //   "unauth",
  //   /**
  //    * For all authenticated user
  //    * will push to login if user is not authenticated
  //    */
  //   "auth",
  // ] as const;
  // type RouteRole = (typeof ROUTE_ROLES)[number];

  // /**
  //  * Add role-based access control to a component
  //  *
  //  * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
  //  * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
  //  */

  // export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  //   Component: React.ComponentType<T>,
  //   routeRole: RouteRole = 'auth',
  //   permissions:string[] | string = [],
  //   permissiontype: Permissions_Types = PERMISSION_TYPE.OR
  // ) {
  //   const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
  //     const router = useRouter();

  //     // get session details
  //     const { data: session, status } = useSession();

  //     //#region  //*=========== STORE ===========  | Get details from store
  //     // const isAuthenticated = false;
  //     // const isLoading = true;
  //     // const login = (loginParams: any) => {
  //     //   //   console.log("login called", loginParams);
  //     // };
  //     // const logout = () => {
  //     //   //   console.log("logout called");
  //     // };
  //     // const stopLoading = () => {
  //     //   //   console.log("stop loading called");
  //     // };
  //     // const user = {
  //     //   name: "Nikhil",
  //     // };
  //     //#endregion  //*======== STORE ===========

  //     const checkAuth = useCallback(() => {
  //       if (status === "unauthenticated") {
  //         signOut();
  //         return;
  //       }
  //       //   const loadUser = async () => {
  //       //     try {
  //       //       const res = await apiMock.get<any>("/me");

  //       //       login({
  //       //         ...res.data.data,
  //       //         token: token + "",
  //       //       });
  //       //     } catch (err) {
  //       //       localStorage.removeItem("token");
  //       //     } finally {
  //       //       stopLoading();
  //       //     }
  //       //   };

  //       if (!isAuthenticated) {
  //         // loadUser();
  //       }
  //     }, [status]);

  //     useEffect(() => {
  //       // run checkAuth every page visit
  //       checkAuth();

  //       // run checkAuth every focus changes
  //       window.addEventListener("focus", checkAuth);
  //       return () => {
  //         window.removeEventListener("focus", checkAuth);
  //       };
  //     }, [checkAuth]);

  //     useLayoutEffect(() => {
  //       if(status ==='unauthenticated' && routeRole !== 'unauth'){
  //       return router.push('/login')
  //       }
  //       else if(status === 'authenticated'  ){
  //         if(routeRole ==='unauth')
  //         return router.push('/login')
  //         if(routeRole ==='auth'){
  //           if (!reqPermissions || reqPermissions.length < 1) {
  //     return true;
  //   }
  //         }
  //       }
  //       if(routeRole === 'auth'){
  //       return null}

  //     }, [status, router, permissions, session])

  //     useEffect(() => {
  //       if (!isLoading) {
  //         if (isAuthenticated) {
  //           // Prevent authenticated user from accessing auth or other role pages
  //           if (routeRole === "auth") {
  //             // if (searchParams.get("redirect")) {
  //             //   router.replace(searchParams.get("redirect") as string);
  //             // } else {
  //             //   router.replace(HOME_ROUTE);
  //             // }
  //           }
  //         } else {
  //           // Prevent unauthenticated user from accessing protected pages
  //           if (routeRole !== "auth" && routeRole !== "optional") {
  //             router.replace(`${LOGIN_ROUTE}?redirect=${router}`);
  //           }
  //         }
  //       }
  //     }, [status, router, permissions]);

  //     if (
  //       // If loading
  //       status === "loading"
  //     ) {
  //       return (
  //         <div className={styles.container}>
  //           <Spin spinning>
  //         </div>
  //       )
  //     }

  //     return <Component {...(props as T)} />;
  //   };

  //   return ComponentWithAuth;
  // }
  return <div>useAuth</div>;
}

export default useAuth;

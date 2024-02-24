import _unauthHttp from "@/services/_unauthHttp";
import config from "@/utils/apiEndoints";
import { tokenDateFormat, X_DEVICE_ID } from "@/utils/constants";
import dayjs from "@/utils/date";
import {
  generateEncryptedPassword,
  getErrorFromApi,
} from "@/utils/helperFunction";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async session({ session, token, user }: any) {
      if (token.error) {
        return false;
      }

      console.log("existing session", session);
      console.log("new updated session", { ...session, ...token });

      return { ...session, ...token };
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      if (user?.error) {
        throw new Error(user?.error);
      }

      return true;
    },
    async jwt({ token, user }: any) {
      console.log("🚀 ~ jwt ~ token:", token);
      console.log("🚀 ~ jwt ~ user:", user);
      console.log("current time", dayjs().format(tokenDateFormat));
      console.log(
        "expiry time",
        dayjs(token.expiresAt).format(tokenDateFormat),
      );
      console.log(
        "condition",
        dayjs().format(tokenDateFormat) <
          dayjs(token.expiresAt).format(tokenDateFormat),
      );
      if (user) {
        return {
          user: { permissions: user?.permissions, details: user?.details },
          accessToken: user?.accessToken,
          refreshToken: user?.refreshToken,
          expiresAt: user?.expiresAt,
        };
      } else if (
        dayjs().format(tokenDateFormat) <
        dayjs(token.expiresAt).format(tokenDateFormat)
      ) {
        // If the access token has not expired yet, return it
        return { ...token };
      } else {
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await _unauthHttp.get(
            config.identity.createSession,
            {
              headers: {
                "Refresh-Token": token?.refreshToken,
                "Grant-Type": "REFRESH_TOKEN",
              },
            },
          );
          console.log("🚀 ~ jwt ~ refresh token response:", response);
          console.log(
            "🚀 ~ jwt ~ refresh token response headers:",
            response?.headers,
          );
          console.log(
            "🚀 ~ jwt ~ refresh token response headers PIM-SID:",
            response?.headers?.["pim-sid"],
          );
          console.log(
            "🚀 ~ jwt ~ refresh token response headers expires at:",
            response?.headers?.["expires-at"],
          );

          if (response.status === 201 && response?.data?.ok) {
            return {
              user: { ...(token?.user || {}) },
              accessToken: response?.headers?.["pim-sid"],
              refreshToken: token?.refreshToken,
              expiresAt: response?.headers?.["expires-at"],
            };
          }

          return { error: "RefreshAccessTokenError" as const };
        } catch (error) {
          console.error(
            "Error refreshing access token",
            getErrorFromApi(error),
          );
          // The error property will be used client-side to handle the refresh token error
          return { error: "RefreshAccessTokenError" as const };
        }
      }
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      //   credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: { label: "Password", type: "password" },
      //   },
      async authorize(credentials: any, req: any) {
        "use client";
        try {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)

          // Call login api to get user session

          const encryptedPass = await generateEncryptedPassword(
            credentials?.password,
          );

          const url = config.identity.login;
          const body = {
            cred: credentials.email,
            password: encryptedPass,
            user_type: "CORE_USER",
            is_otp_login: false,
          };

          const headers = {
            [X_DEVICE_ID]: "armaze-web",
          };

          const res = await _unauthHttp.post(url, body, {
            headers,
          });
          console.log("🚀 ~ authorize ~ res:", res?.data);

          // If no error and we have user data, return it
          if (res?.data) {
            return {
              details: {
                name: res?.data?.result?.name,
                email: res?.data?.result?.email,
                userGroup: res?.data?.result?.user_group_id,
                id: res?.data?.result?.id,
                userId: res?.data?.result?.user_id,
                tenantId: res?.data?.result?.tenant_id,
              },
              permissions: res?.data?.result?.permissions,
              accessToken: res?.headers?.["pim-sid"],
              refreshToken: res?.headers?.["refresh-token"],
              expiresAt: res?.headers?.["expires-at"],
              id: res?.data?.result?.id,
              error: undefined,
            };
          }
          // Return error if user data could not be retrieved
          return {
            user: undefined,
            id: getErrorFromApi(res),
            error: getErrorFromApi(res),
          };
        } catch (error) {
          return {
            user: undefined,
            id: getErrorFromApi(error),
            error: getErrorFromApi(error),
          };
        }
      },
      credentials: {},
    }),
  ],
  debug: true,
};

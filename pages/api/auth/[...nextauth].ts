import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    user_type?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        user_type: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
              user_type: credentials?.user_type,
            }
          );

          const data = response.data;

          if (data?.status && data.data) {
            return data.data;
          } else {
            throw new Error(
              JSON.stringify({
                message: data.message,
                status: data.status,
                data: data.data,
                fullResponse: data,
              })
            );
          }
        } catch (err) {
          const error = err as AxiosError;
          if (error.response) {
            const responseData = error.response.data as {
              message?: string;
              status?: boolean;
              data?: unknown;
            };
            throw new Error(
              JSON.stringify({
                message: responseData.message,
                status: responseData.status,
                data: responseData.data,
                fullResponse: responseData,
              })
            );
          }
          throw new Error(
            JSON.stringify({
              message: error.message || "Login failed",
              status: false,
              data: null,
              fullResponse: null,
            })
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.user_type = session.user.user_type; // ✅ Add this
        token.user = {
          ...(token.user || {}),
          ...session.user,
        };
        return token;
      }

      if (user) {
        token.user = user;
        token.user_type = user?.user_type || "user"; // ✅ Add this
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.user = token.user as Session["user"]; // now strongly typed
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2, // 2 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 2,
  },
};

export default NextAuth(authOptions);

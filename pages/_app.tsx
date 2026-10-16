import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "@/lib/theme";
import AuthLayout from "@/components/AuthLayout";
import AppLayout from "@/components/AppLayout";
import { SnackbarProvider } from "../components/SnackbarProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // Define auth routes that should use AuthLayout
  const authRoutes = [
    "/login",
    "/create-account",
    "/role-selection",
    "/auth/error",
  ];

  // Define routes that should not use any layout wrapper (like welcome screen)
  const noLayoutRoutes = [
    "/",
    "/login",
    "/create-account/[role]",
    "/forgot-password",
    "/verification",
    "/verify-account/[type]",
  ];

  // Check route type
  const isAuthRoute = authRoutes.includes(router.pathname);
  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);
  const isAppRoute = !isAuthRoute && !isNoLayoutRoute;

  // Layout wrapper component
  const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (isNoLayoutRoute) {
      return <>{children}</>;
    }

    if (isAuthRoute) {
      return <AuthLayout>{children}</AuthLayout>;
    }

    if (isAppRoute) {
      return <AppLayout>{children}</AppLayout>;
    }

    return <>{children}</>;
  };

  return (
    <>
      <Head>
        <title>Dotsquare - Heal Yourself</title>
        <meta
          name="description"
          content="Dotsquare - Wellness-Focused Healing Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <LayoutWrapper>
              <Component {...pageProps} />
            </LayoutWrapper>
          </SnackbarProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

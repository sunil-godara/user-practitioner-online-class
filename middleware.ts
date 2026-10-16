import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const publicRoutes = [
      "/",
      "/login",
      "/create-account",
      "/role-selection",
      "/coming-soon",
      "/auth/error",
    ];

    const practitionerRoutes = ["/practitioner-dashboard"];
    const userRoutes = [
      "/dashboard",
      "/upcoming-sessions",
      "/calendar",
      "/find-session",
      "/profile",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const userRole = token?.user_type;

    // Redirect authenticated users away from public pages
    if (token && isPublicRoute) {
      const dashboardUrl =
        userRole === "practitioner" ? "/practitioner-dashboard" : "/dashboard";

      if (!pathname.includes("dashboard")) {
        return NextResponse.redirect(new URL(dashboardUrl, req.url));
      }
    }

    // Role-based route protection
    if (token) {
      if (practitionerRoutes.some((route) => pathname.startsWith(route))) {
        if (userRole !== "practitioner") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }

      if (userRoutes.some((route) => pathname.startsWith(route))) {
        if (userRole === "practitioner") {
          return NextResponse.redirect(
            new URL("/practitioner-dashboard", req.url)
          );
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const publicRoutes = [
          "/",
          "/login",
          "/create-account",
          "/role-selection",
          "/coming-soon",
          "/auth/error",
        ];

        const isPublicRoute = publicRoutes.some((route) =>
          pathname.startsWith(route)
        );
        return isPublicRoute || !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

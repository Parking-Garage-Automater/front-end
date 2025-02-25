import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export function middleware(req: NextRequest) {
    const encryptedToken = req.cookies.get("authToken")?.value || "";
    const { pathname, origin } = req.nextUrl;

    const isUserValid = checkValidity(encryptedToken);

    if (!isUserValid) {
        if (pathname !== "/login") {
            const loginURL = new NextURL("/login", origin);
            return NextResponse.redirect(loginURL);
        }
    } else {
        if (pathname === "/login" || pathname === "/register") {
            const dashboardURL = new NextURL("/dashboard", origin);
            return NextResponse.redirect(dashboardURL);
        }
    }
    return NextResponse.next();
}

const checkValidity = (encryptedToken: string) => {

    // Call verify api to check if token is valid
    return true;
}

export const config = {
    matcher: [
      "/dashboard/:path*", 
      "/login",
      "/register",
      "/",
      "/dashboard",
    ],
  };
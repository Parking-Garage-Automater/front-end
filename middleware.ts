import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";


export function middleware(req: NextRequest) {
    const userCookie = req.cookies.get("user_info")?.name || "";
    const { pathname, origin } = req.nextUrl;

    const isUserLoggedIn = checkValidity(userCookie);

    if (!isUserLoggedIn) {
        if (pathname === "/dashboard" || pathname === "/profile" || pathname === "/" ) {
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

const checkValidity = (userCookie: string) => {

    return userCookie !== "";
}

export const config = {
    matcher: [
      "/dashboard/:path*", 
      "/",
      "/dashboard",
      "/profile"
    ],
  };
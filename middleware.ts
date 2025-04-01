import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { API_CONSTANTS } from "@/constants/ApiConstants";


export function middleware(req: NextRequest) {
    const encryptedToken = req.cookies.get("Token")?.value || "";
    const { pathname, origin } = req.nextUrl;

    let isTokenValid: boolean = true;
    checkValidity(encryptedToken).then((response: boolean) => {
        isTokenValid = response;
    });
    if (!isTokenValid) {
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

const checkValidity = async (encryptedToken: string) => {

    const res = await fetch(API_CONSTANTS.VERIFY_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let response = await res;
    if (res.ok) {
        return true;
    } else {
        return false;
    }
}

export const config = {
    matcher: [
      "/dashboard/:path*", 
      "/",
      "/dashboard",
      "/profile",
      "/analytics"
    ],
  };
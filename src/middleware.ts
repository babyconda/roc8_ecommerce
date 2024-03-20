import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  const homePath = path === "/";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/categories", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (homePath) {
    return NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/categories", "/login", "/signup"],
};

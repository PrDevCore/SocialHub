import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes must be authenticated
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/post(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets, run middleware on everything else
    "/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
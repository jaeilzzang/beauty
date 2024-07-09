import { ROUTE } from "@/router";
import { createActionRedirectUrl } from "@/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // error
  const error = requestUrl.searchParams.get("error_code");
  const error_description = requestUrl.searchParams.get("error_description");

  if (error && error_description) {
    return NextResponse.redirect(
      createActionRedirectUrl(
        ROUTE.EMAIL_VERIFICATION,
        encodeURIComponent(error_description)
      )
    );
  }

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(ROUTE.SIGN_UP);
}

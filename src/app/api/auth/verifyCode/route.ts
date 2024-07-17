import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, token } = body;

  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "signup",
    });

    if (error) {
      return Response.json(
        { data },
        { status: error.status, statusText: error.code }
      );
    }

    return Response.json({ data }, { status: 200, statusText: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

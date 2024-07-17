import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") as string;

  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    console.log(error, data, "sendcode");

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

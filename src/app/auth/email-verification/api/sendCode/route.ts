import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") as string;

  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      throw Error(error.message);
    }

    return Response.json({ data }, { status: 200, statusText: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { success: true, error: "" },
        { status: 500, statusText: error.message }
      );
    }
  }
}

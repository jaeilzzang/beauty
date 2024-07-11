import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") as string;

  const supabase = createClient();

  console.log(email);

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      throw Error(error.message);
    }

    return Response.json({ data, success: true, error: "" });
  } catch (error) {
    return Response.json({ data: [], success: false, error: error });
  }
}

import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const body = await req.json();

    if (!body.email) {
      throw Error("not Found Email");
    }

    const { data, error, status, statusText } = await supabase
      .from("user")
      .select("*")
      .match({ email: body.email });

    if (error) {
      return Response.json({ status, statusText });
    }

    return Response.json({ user: data[0] }, { status, statusText });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 500, statusText: error.message });
    }
  }
}

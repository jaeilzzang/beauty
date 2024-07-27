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

    const findUser = await supabase
      .from("user")
      .select("uuid,email,email_verify")
      .match({ email });

    if (!findUser.data || !findUser.data[0].uuid) {
      throw Error("Not Found User");
    }

    const createEmailVerify = await supabase
      .from("user")
      .update({ email_verify: true })
      .match({ uuid: findUser.data[0].uuid });

    if (createEmailVerify.error) {
      const { error } = createEmailVerify;
      throw Error(error.message || error.code);
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

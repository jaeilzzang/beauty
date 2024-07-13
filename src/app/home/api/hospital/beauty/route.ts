import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    const { data } = await supabase
      .from("hospital")
      .select("id, imageurls, name, id_unique")
      .limit(6);

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

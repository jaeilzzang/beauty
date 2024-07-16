import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const id_hospital = searchParams.get("id");

  try {
    const { data, error, count, status, statusText } = await supabase
      .from("event")
      .select("*", { count: "exact" })
      .match({ id_hospital })
      .order("id_unique", { ascending: true });

    if (error) {
      return Response.json({ data: null }, { status, statusText });
    }

    const payload = {
      data,
      count,
    };

    return Response.json(payload, { status: 200, statusText: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

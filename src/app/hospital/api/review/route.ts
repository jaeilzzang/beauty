import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const id_hospital = searchParams.get("id");

  try {
    const { data, count, error, status, statusText } = await supabase
      .from("reviews")
      .select("*, hospital ( name ), user ( nickname )", { count: "exact" })
      .match({ id_hospital })
      .order("created_at", { ascending: true });

    if (error) {
      return Response.json({ data, count }, { status, statusText });
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

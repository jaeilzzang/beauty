import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase.from("banner_item").select("*");

  return Response.json({ data });
}

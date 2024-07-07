import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase.from("BannerItem").select("*");

  return Response.json({ data });
}

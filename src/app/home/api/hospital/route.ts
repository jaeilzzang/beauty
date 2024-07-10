import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase.from("hospital").select("*");

  return Response.json({ data });
}

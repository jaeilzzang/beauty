import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const id_unique = searchParams.get("id");

  try {
    const { data, error, status, statusText } = await supabase
      .from("hospital")
      .select(
        `imageurls,
         name,
         hospital_details: hospital_details!hospital_id_unique_fkey (
            tel,
            homepage,
            kakaotalk,
            facebook,
            instagram,
            blog,
            youtube,
            ticktok,
            snapchat
        )
        `
      )
      .match({ id_unique });

    if (error) {
      return Response.json({ data: null }, { status, statusText });
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

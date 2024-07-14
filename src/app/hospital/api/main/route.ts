import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const id_hospital = searchParams.get("id");

  try {
    const { data, error } = await supabase
      .from("hospital_details")
      .select(
        `kakaotalk,
         facebook,
         instagram,
         blog,
         youtube,
         ticktok,
         snapchat,
         etc,
         tel,
         homepage,
         hospital (
            imageurls
        )`
      )
      .match({ id_hospital });

    if (error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
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

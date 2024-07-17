import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = createClient();

  try {
    const { data, error, status, statusText, count } = await supabase
      .from("hospital")
      .select(
        `id_unique,
         imageurls,
         name,
         location,
         latitude,
         longitude
        `,
        { count: "exact" }
      );

    if (error) {
      return Response.json({ data: null }, { status, statusText });
    }

    return Response.json(
      { data, count },
      { status: 200, statusText: "success" }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

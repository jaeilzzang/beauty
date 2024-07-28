import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id_unique = params.id;
  const supabase = createClient();

  try {
    const { data, error, status, statusText } = await supabase
      .from("hospital")
      .select(
        `id_unique,
         imageurls,
         name,
         favorite: favorite ("*")
        `
      )
      .match({ id_unique });

    const { data: detailData, error: detailError } = await supabase
      .from("hospital_details")
      .select(
        `
        tel,
        homepage,
        kakaotalk,
        facebook,
        instagram,
        blog,
        youtube,
        ticktok,
        snapchat
        `
      )
      .match({ id_hospital: id_unique });

    if (error || detailError) {
      return Response.json({ data: null }, { status, statusText });
    }

    return Response.json(
      {
        data: {
          ...data[0],
          hospital_details: detailData[0],
        },
      },
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

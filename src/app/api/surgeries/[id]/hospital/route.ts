import { createClient } from "@/utils/supabase/server";
import { LIMIT } from "./constant";
import { location as locationList } from "@/constants";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const id = params.id;

  const { searchParams } = new URL(req.url);
  const pageParam = parseInt(searchParams.get("pageParam") as string);

  const offset = pageParam * LIMIT;
  const limit = offset + LIMIT - 1;

  try {
    const surgeriesId = await supabase
      .from("banner_item")
      .select(`id_surgeries`)
      .match({ id });

    if (!surgeriesId.data) {
      return Response.json(
        { data: null },
        { status: surgeriesId.status, statusText: surgeriesId.statusText }
      );
    }

    const surgeriesIds = surgeriesId.data[0].id_surgeries;

    const { data, error, status, statusText, count } = await supabase
      .from("hospital")
      .select("*", { count: "exact" })
      .overlaps("id_surgeries", surgeriesIds)
      .range(offset, limit);

    if (error) {
      return Response.json({ data: null }, { status, statusText });
    }

    const nextCursor = count && limit < count;

    return Response.json({ data, nextCursor }, { status, statusText });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

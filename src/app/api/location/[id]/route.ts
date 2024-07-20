import { createClient } from "@/utils/supabase/server";
import { LIMIT } from "./constant";
import { location as locationList } from "@/constants";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const location = locationList.findIndex((e) => {
    return e.toLowerCase() === params.id.toLowerCase();
  });

  const { searchParams } = new URL(req.url);
  const pageParam = parseInt(searchParams.get("pageParam") as string);

  const offset = pageParam * LIMIT;
  const limit = offset + LIMIT - 1;

  try {
    const baseListQuery = supabase
      .from("hospital")
      .select(
        `id_unique,
         imageurls,
         name
        `,
        { count: "exact" }
      )
      .range(offset, limit);

    const basePositionQuery = supabase.from("hospital").select(
      `id_unique,
         name,
         location,
         latitude,
         longitude
        `,
      { count: "exact" }
    );

    if (location !== -1) {
      console.log("first", location);
      baseListQuery.match({ location });
      basePositionQuery.match({ location });
    }

    const { data, error, status, statusText, count } = await baseListQuery;

    const responsePosition = await basePositionQuery;

    if (error) {
      return Response.json({ data: null }, { status, statusText });
    }

    const position = responsePosition.data?.map(
      ({ latitude, longitude, name }) => {
        return {
          lat: latitude,
          lng: longitude,
          title: name,
        };
      }
    );

    const nextCursor = count && limit < count;

    return Response.json(
      { data, position, nextCursor },
      { status, statusText }
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

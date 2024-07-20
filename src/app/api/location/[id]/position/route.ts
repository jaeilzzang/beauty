import { location as locationList } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const location = locationList.findIndex((loc) => {
    return loc.toLowerCase() === params.id.toLowerCase();
  });

  try {
    const { data, error, status, statusText } = await supabase
      .from("hospital")
      .select(
        `id_unique,
         name,
         location,
         latitude,
         longitude
        `
      )
      .match({ location });

    if (error) {
      return Response.json({ data: null }, { status, statusText });
    }

    const position = data?.map(({ latitude, longitude, name }) => {
      return {
        lat: latitude,
        lng: longitude,
        title: name,
      };
    });

    return Response.json({ position }, { status, statusText });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

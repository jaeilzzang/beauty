import { createClient } from "@/utils/supabase/server";
import { LIMIT } from "./constant";
import { infinityParams } from "@/utils/inifinityQuery";

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { limit, offset, nextCursor } = infinityParams({
      req,
      limits: LIMIT,
    });

    // 전체 리스트
    const { data, error, count, status, statusText } = await supabase
      .from("favorite")
      .select(`*,hospital: id_hospital (name,imageurls,id_unique)`, {
        count: "exact",
      })
      .range(offset, limit)
      .match({ uuid: user?.id });

    if (error) {
      throw Error(error.code || error.message);
    }

    const res = {
      favorite: data,
      nextCursor: nextCursor(count),
    };

    return Response.json(res, { status, statusText });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  const path = req.nextUrl.searchParams.get("path") as string;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { id_hospital } = body;

    const { data, error, statusText } = await supabase
      .from("favorite")
      .select("*")
      .eq("uuid", user?.id)
      .eq("id_hospital", id_hospital);

    if (error) {
      throw Error(statusText);
    }

    if (data?.length) {
      throw Error("already has favorite item");
    }

    const createFavorite = await supabase
      .from("favorite")
      .insert([{ uuid: user?.id, id_hospital }]);

    if (createFavorite.error) {
      throw Error(createFavorite.statusText);
    }

    revalidatePath(path);

    return NextResponse.json(data, {
      status: createFavorite.status,
      statusText: createFavorite.statusText,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  const path = req.nextUrl.searchParams.get("path") as string;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { id_hospital } = body;

    const parseId = JSON.parse(id_hospital);

    if (!user) throw Error("not Found User");

    let query = supabase.from("favorite").delete().eq("uuid", user?.id);

    if (parseId instanceof Array) {
      query.in("id_hospital", parseId);
    } else {
      query.eq("id_hospital", parseId);
    }

    const { data, error, status, statusText } = await query.select("*");

    if (!error) {
      revalidatePath(path);
      return NextResponse.json(data, { status, statusText });
    }

    return NextResponse.json(data, {
      status,
      statusText,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { data: null },
        { status: 500, statusText: error.message }
      );
    }
  }
}

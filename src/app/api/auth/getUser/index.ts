import { fetchUtils } from "@/utils/fetch";
import { UserOutputDto } from "./getUser.dto";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ROUTE } from "@/router";

export const getUserAPI = async (): Promise<UserOutputDto | null> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    user: user,
  };
};

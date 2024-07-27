import { fetchUtils } from "@/utils/fetch";
import { UserOutputDto } from "./getUser.dto";
import { createClient } from "@/utils/supabase/server";

export const getUserAPI = async (): Promise<UserOutputDto | null> => {
  const supabase = createClient();

  const {
    data: { user: user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const payload = JSON.stringify({ email: user.email });

  const res = await fetchUtils<UserOutputDto>({
    url: `http://localhost:3000/api/auth/getUser`,
    fetchOptions: {
      method: "POST",
      body: payload,
      cache: "no-cache",
    },
  });

  return res;
};

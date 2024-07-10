import { ROUTE } from "@/router";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LogoutBtn from "../logout";

const Auth = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const href = user ? ROUTE.MY_PAGE : ROUTE.LOGIN;
  const text = user ? user.email : "login";

  return (
    <div>
      <Link href={href}>{text}</Link>
      {user && <LogoutBtn />}
    </div>
  );
};

export default Auth;

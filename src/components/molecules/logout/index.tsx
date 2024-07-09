"use client";

import Button from "@/components/atoms/button";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();

  return (
    <Button
      color="red"
      variant="outline"
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      LOGOUT
    </Button>
  );
};

export default LogoutBtn;

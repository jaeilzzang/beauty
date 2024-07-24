import { getUserAPI } from "@/app/api/auth/getUser";
import LogoutBtn from "@/components/molecules/logout";

import { notFound } from "next/navigation";

const MyPage = async () => {
  const { user } = await getUserAPI();

  if (!user) notFound();

  return (
    <main className="container">
      <div>{user.nickname}</div>
      <br />
      <div>
        <LogoutBtn />
      </div>
    </main>
  );
};

export default MyPage;

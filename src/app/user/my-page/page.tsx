import { getUserAPI } from "@/app/api/auth/getUser";
import LogoutBtn from "@/components/molecules/logout";

import styles from "./my-page.module.scss";
import { notFound } from "next/navigation";

const MyPage = async () => {
  const users = await getUserAPI();

  if (!users) notFound();

  return (
    <main className={styles.mypage}>
      <div>{users.user.user_metadata.full_name}</div>
      <br />
      <div>
        <LogoutBtn />
      </div>
    </main>
  );
};

export default MyPage;

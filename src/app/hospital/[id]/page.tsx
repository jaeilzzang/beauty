import Image from "next/image";
import React from "react";

import styles from "./hospitalDetail.module.scss";
import HospitalTab from "./components/tab";

const HospitalDetailPage = ({
  searchParams,
}: {
  searchParams: { tab: string };
}) => {
  return (
    <main>
      <div className={styles.thumbnail_box}>
        <Image fill src={`/hospital/h1.jpeg`} alt="h1" priority />
      </div>

      {/* tab */}
      <HospitalTab currentTab={searchParams.tab} />
    </main>
  );
};

export default HospitalDetailPage;

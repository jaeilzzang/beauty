import Image from "next/image";
import React from "react";

import styles from "./hospitalDetail.module.scss";
import Tab from "./components/tab";

const HospitalDetailPage = () => {
  return (
    <main>
      <div className={styles.thumbnail_box}>
        <Image fill src={`/hospital/h1.jpeg`} alt="h1" priority />
      </div>

      {/* tab */}
      <Tab />
    </main>
  );
};

export default HospitalDetailPage;

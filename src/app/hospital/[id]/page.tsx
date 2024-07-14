import Image from "next/image";
import React, { Suspense } from "react";

import styles from "./hospitalDetail.module.scss";
import HospitalTab from "./components/tab";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import { getHospitalMainAPI } from "../api/main";
import Floating from "./components/floating";

interface HospitalDetailPageProps {
  params: { id: string };
  searchParams: { tab: string };
}

const HospitalDetailPage = async ({
  params,
  searchParams,
}: HospitalDetailPageProps) => {
  const { data } = await getHospitalMainAPI({ id: params.id });
  console.log(data, "data");

  const getFloatList = Object.entries(data[0]).reduce(
    (acc, [key, value]) => {
      if (typeof value === "string" && Boolean(value)) {
        console.log(key, value);
        acc.push({ name: key, href: value });
      }

      return acc;
    },
    [{ name: "", href: "" }]
  );

  console.log(getFloatList, "getFloatList");

  return (
    <main className={styles.main}>
      {/* <ThumbnailImg src={data[0].hospital.imageurls[0]} alt="thumbnail" /> */}
      <div className={styles.thumbnail_box}>
        <Image fill src={data[0].hospital.imageurls[0]} alt="h1" />
      </div>

      {/* tab */}
      <Suspense fallback={<LoadingSpinner />}>
        <HospitalTab currentTab={searchParams.tab} id={params.id} />
      </Suspense>

      {/* floating */}
      <Floating float={getFloatList} />
    </main>
  );
};

export default HospitalDetailPage;

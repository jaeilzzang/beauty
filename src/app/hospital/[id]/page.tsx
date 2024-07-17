import Image from "next/image";
import React, { Suspense } from "react";

import styles from "./hospitalDetail.module.scss";
import HospitalTab from "./components/tab";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import { getHospitalMainAPI } from "../../api/hospital/[id]/main";
import Floating, { FloatItem } from "./components/floating";
import { redirect } from "next/navigation";
import PageHeader from "@/components/molecules/header/page-header";

interface HospitalDetailPageProps {
  params: { id: string };
  searchParams: { tab: string };
}

const HospitalDetailPage = async ({
  params,
  searchParams,
}: HospitalDetailPageProps) => {
  if (params.id === "undefined") redirect("/");

  const { data } = await getHospitalMainAPI({ id: params?.id });

  const getFloatList = Object.entries(data[0].hospital_details).reduce<
    FloatItem[]
  >((acc, [key, value]) => {
    if (typeof value === "string" && Boolean(value)) {
      acc.push({ name: key, href: value });
    }

    return acc;
  }, []);

  return (
    <main>
      <PageHeader name={data[0].name} />
      <div className={styles.main}>
        {/* <ThumbnailImg src={data[0].hospital.imageurls[0]} alt="thumbnail" /> */}
        <div className={styles.thumbnail_box}>
          <Image fill src={data[0].imageurls[0]} alt={data[0].name} />
        </div>

        {/* tab */}
        <Suspense fallback={<LoadingSpinner />}>
          <HospitalTab currentTab={searchParams.tab} id={params.id} />
        </Suspense>

        {/* floating */}
        <Floating float={getFloatList} />
      </div>
    </main>
  );
};

export default HospitalDetailPage;

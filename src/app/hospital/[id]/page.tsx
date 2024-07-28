import Image from "next/image";
import React from "react";

import styles from "./hospital-detail..module.scss";
import HospitalTab from "./components/tab";

import { getHospitalMainAPI } from "../../api/hospital/[id]/main";
import Floating, { FloatItem } from "./components/floating";
import { redirect } from "next/navigation";
import PageHeader from "@/components/molecules/header/page-header";
import { HospitalFavoriteIcon } from "@/components/atoms/favorite";

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

  const getFloatList = Object.entries(data.hospital_details).reduce<
    FloatItem[]
  >((acc, [key, value]) => {
    if (typeof value === "string" && Boolean(value)) {
      acc.push({ name: key, href: value });
    }

    return acc;
  }, []);

  return (
    <main>
      <PageHeader name={data.name}>
        <HospitalFavoriteIcon isFavorite={!!data.favorite.length} />
      </PageHeader>
      <div className={styles.main}>
        <div className={styles.thumbnail_box}>
          <Image fill src={data.imageurls[0]} alt={data.name} />
        </div>

        {/* tab */}
        <HospitalTab currentTab={searchParams.tab} id={params.id} />

        {/* floating */}
        <Floating float={getFloatList} />
      </div>
    </main>
  );
};

export default HospitalDetailPage;

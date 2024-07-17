import React from "react";

import styles from "./locationDetail.module.scss";
import { HospitalCard } from "@/components/molecules/card";
import { getLocationDetailAPI } from "../../api/location/[id]";

import { ROUTE } from "@/router";
import { Map } from "@/components/common/map";
import PageHeader from "@/components/molecules/header/page-header";

interface LocationDetailPageProps {
  searchParams: string;
  params: {
    id: string;
  };
}

const LocationDetailPage = async ({ params }: LocationDetailPageProps) => {
  const { data, count } = await getLocationDetailAPI({ id: params.id });

  console.log(count);

  const position = data.map(({ latitude, longitude, name }) => {
    return {
      lat: latitude,
      lng: longitude,
      title: name,
    };
  });

  return (
    <>
      <main>
        <PageHeader name={data[0].name} />
        <div className={styles.map}>
          <Map coordinates={position} />
        </div>
        <section className={styles.section}>
          {data.map(({ id_unique, name, imageurls }) => (
            <HospitalCard
              key={id_unique}
              src={imageurls[0]}
              alt={name}
              name={name}
              href={ROUTE.HOSPITAL_DETAIL("") + id_unique}
            />
          ))}
          {/* tab */}
          {/* <Tab /> */}
        </section>
      </main>
    </>
  );
};

export default LocationDetailPage;

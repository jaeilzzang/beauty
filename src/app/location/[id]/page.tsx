import React from "react";

import styles from "./locationDetail.module.scss";

import { getLocationDetailAPI } from "../../api/location/[id]";

import LocationPageTemplate from "../template";

interface LocationDetailPageProps {
  searchParams: string;
  params: {
    id: string;
  };
}

const LocationDetailPage = async ({ params }: LocationDetailPageProps) => {
  const { data, count } = await getLocationDetailAPI({ id: params.id });

  console.log(count);

  return (
    <>
      <main>
        <LocationPageTemplate data={data} />
      </main>
    </>
  );
};

export default LocationDetailPage;

"use client";

import { getLocationDetailAPI } from "../../api/location/[id]";

import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import { LocationMap } from "../components/map";
import { InfinityItemList } from "@/components/template/InfinityItem";
import { HospitalCard } from "@/components/molecules/card";
import { ROUTE } from "@/router";
import { getPositionAPI } from "@/app/api/location/[id]/position";
import { useQuery } from "@tanstack/react-query";
import styles from "./location-detail.module.scss";

interface LocationDetailPageProps {}

const LocationDetailPage = ({}: LocationDetailPageProps) => {
  const { id }: { id: string } = useParams();

  const { data } = useQuery({
    queryKey: ["position", id],
    queryFn: () => getPositionAPI({ id }),
  });

  if (!data) return <LoadingSpinner pageLoading />;

  return (
    <main>
      <LocationMap name={id.toUpperCase()} position={data.position} />

      <InfinityItemList
        className={styles.grid}
        fetchFn={getLocationDetailAPI}
        queryKey={"surgeries_reviews"}
      >
        {(item) => {
          return (
            <>
              {item.data.map(({ id_unique, imageurls, name }) => {
                return (
                  <HospitalCard
                    key={id_unique}
                    src={imageurls[0]}
                    alt={name}
                    name={name}
                    href={ROUTE.HOSPITAL_DETAIL("") + id_unique}
                  />
                );
              })}
            </>
          );
        }}
      </InfinityItemList>
    </main>
  );
};

export default LocationDetailPage;

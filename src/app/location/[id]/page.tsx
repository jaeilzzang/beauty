"use client";

import { Fragment, useRef } from "react";

import styles from "./locationDetail.module.scss";

import { getLocationDetailAPI } from "../../api/location/[id]";

import { useParams } from "next/navigation";
import { useInfinity } from "@/hooks/useInfinity";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import { LocationMap } from "../components/map";
import { LocationItem } from "../components/item";

interface LocationDetailPageProps {}

const LocationDetailPage = ({}: LocationDetailPageProps) => {
  const { id }: { id: string } = useParams();

  const observerElem = useRef<HTMLDivElement>(null);

  const { data, error, isFetching, isFetchingNextPage, status } = useInfinity({
    observerElem,
    queryKey: ["location_detail", id],
    fetchFn: (pageParam) => getLocationDetailAPI({ id, pageParam }),
  });

  if (!data || status === "pending") return <LoadingSpinner />;

  if (error && status === "error") return <div>Error: {error.message}</div>;

  return (
    <main>
      <LocationMap name={id.toUpperCase()} position={data.pages[0].position} />
      {data.pages.map((e, i) => {
        return (
          <Fragment key={i}>
            <LocationItem key={i} data={e.data} />
          </Fragment>
        );
      })}

      {isFetching && isFetchingNextPage ? (
        <LoadingSpinner />
      ) : (
        <div ref={observerElem}></div>
      )}
    </main>
  );
};

export default LocationDetailPage;

"use client";

import React, { useRef } from "react";

import styles from "../tab/styles/event.module.scss";
import { EventCard } from "@/components/molecules/card";
import { ROUTE } from "@/router";
import { getHospitalEventAPI } from "@/app/api/hospital/[id]/event";
import { useInfinity } from "@/hooks/useInfinity";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/atoms/loading/spinner";

const EventTab = () => {
  const { id }: { id: string } = useParams();

  const observerElem = useRef<HTMLDivElement>(null);

  const { data, error, isFetching, isFetchingNextPage, status } = useInfinity({
    observerElem,
    queryKey: ["event_tab", id],
    fetchFn: (pageParam) => getHospitalEventAPI({ id, pageParam }),
  });

  if (!data || status === "pending") return <LoadingSpinner />;

  if (error && status === "error") return <div>Error: {error.message}</div>;

  return (
    <>
      <div className={styles.grid}>
        {data.pages.map((e) => {
          return e.data.map((e) => {
            const fromDate = new Date(e.date_from).toISOString();
            const toDate = new Date(e.date_to).toISOString();
            return (
              <EventCard
                key={e.id_unique}
                href={ROUTE.EVENT_DETAIL("") + e.id}
                src={e.imageurls[0]}
                title={e.name}
                date={`${fromDate}${toDate}`}
                desc={e.description}
                alt={e.name}
              />
            );
          });
        })}
      </div>
      {isFetching && isFetchingNextPage ? (
        <LoadingSpinner />
      ) : (
        <div ref={observerElem}></div>
      )}
    </>
  );
};

export default EventTab;

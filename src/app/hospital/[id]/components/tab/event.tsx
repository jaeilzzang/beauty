import React from "react";

import styles from "../tab/styles/event.module.scss";
import { EventCard } from "@/components/molecules/card";
import { ROUTE } from "@/router";
import { getHospitalEventAPI } from "@/app/api/hospital/[id]/event";

interface EventTabProps {
  id: string;
}

const EventTab = async ({ id }: EventTabProps) => {
  const { data } = await getHospitalEventAPI({ id });

  return (
    <div className={styles.grid}>
      {data.map((e) => {
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
      })}
    </div>
  );
};

export default EventTab;

"use client";

import PageHeader from "@/components/molecules/header/page-header";
import { InfinityItemList } from "@/components/template/InfinityItem";

import { EventCard } from "@/components/molecules/card";
import { ROUTE } from "@/router";
import { daysYMDFormat } from "@/utils/days";
import { getAllEventAPI } from "../api/event";

import styles from "./event.module.scss";

const AllEventPage = () => {
  return (
    <>
      <PageHeader name="All Event" />
      <InfinityItemList
        grid="2"
        fetchFn={getAllEventAPI}
        queryKey={"event_all"}
        className={styles.wrapper}
      >
        {(item) =>
          item.data.map(
            ({
              description,
              imageurls,
              name,
              id_unique,
              date_from,
              date_to,
            }) => {
              return (
                <EventCard
                  key={id_unique}
                  href={ROUTE.EVENT_DETAIL("") + id_unique}
                  src={imageurls && imageurls[0]}
                  title={name}
                  date={`${daysYMDFormat(date_from)} ~ ${daysYMDFormat(
                    date_to
                  )}`}
                  desc={description}
                  alt={name}
                />
              );
            }
          )
        }
      </InfinityItemList>
    </>
  );
};

export default AllEventPage;

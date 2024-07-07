"use client";

import { useSearchParams } from "next/navigation";

// import styles from "../styles/tab.module.scss";

import TabComponent from "@/components/molecules/tab";
import { TTabKey, tabList } from "./constant";
import { TAB } from "@/constants/key";
import {
  EventCard,
  HospitalCard,
  ReviewCard,
} from "@/components/molecules/card";
import { ROUTE } from "@/router";

const RecommendTab = () => {
  const currentTab = useSearchParams().get(TAB) || (tabList[0].key as TTabKey);

  const Component: Record<TTabKey & string, JSX.Element> = {
    event: (
      <EventCard
        href={ROUTE.EVENT_DETAIL + 1}
        src={"/banner/banner1.jpeg"}
        alt={""}
        title={""}
        date={""}
        desc={""}
      />
    ),
    hospitals: (
      <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name="name" />
    ),
    reviews: (
      <ReviewCard
        src={"/banner/banner1.jpeg"}
        alt={""}
        content={""}
        id={""}
        name={""}
      />
    ),
  };

  return (
    <TabComponent
      component={Component[currentTab as TTabKey]}
      currentTab={currentTab}
      list={tabList}
    />
  );
};

export default RecommendTab;

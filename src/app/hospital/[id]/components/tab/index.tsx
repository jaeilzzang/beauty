"use client";

import { useSearchParams } from "next/navigation";

// import styles from "../styles/tab.module.scss";

import { tabList } from "./constants";

import TabComponent from "@/components/molecules/tab";

import InfoTab from "./info";
import EventTab from "./event";
import ReviewTab from "./review";
import { TAB } from "@/constants/key";

const HospitalTab = () => {
  const currentTab = useSearchParams().get(TAB) || tabList[0].key;

  const Component: Record<string, JSX.Element> = {
    info: <InfoTab />,
    event: <EventTab />,
    review: <ReviewTab />,
  };

  return (
    <TabComponent
      component={Component[currentTab]}
      currentTab={currentTab}
      list={tabList}
    />
  );
};

export default HospitalTab;

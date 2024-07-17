"use client";

import { tabList } from "@/app/hospital/[id]/components/tab/constants";
import EventTab from "@/app/hospital/[id]/components/tab/event";
import InfoTab from "@/app/hospital/[id]/components/tab/info";
import ReviewTab from "@/app/hospital/[id]/components/tab/review";
import TabComponent from "@/components/molecules/tab";
import { TAB } from "@/constants/key";
import { useSearchParams } from "next/navigation";
import React from "react";

const AllEventTab = () => {
  const currentTab = useSearchParams().get(TAB) || tabList[0].key;

  const Component: Record<string, JSX.Element> = {
    info: <InfoTab id={""} />,
    event: <EventTab id={""} />,
    review: <ReviewTab id={""} />,
  };

  return (
    <TabComponent
      component={Component[currentTab]}
      currentTab={currentTab}
      list={tabList}
    />
  );
};

export default AllEventTab;

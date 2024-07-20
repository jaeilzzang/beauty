"use client";

import { useSearchParams } from "next/navigation";

import TabComponent from "@/components/molecules/tab";

import { TAB } from "@/constants/key";

import {
  RecommendEvent,
  RecommendHospital,
  RecommendReview,
  TTabKey,
  tabList,
} from "./";
import { Suspense } from "react";
import LoadingSpinner from "@/components/atoms/loading/spinner";

export const RecommendTab = () => {
  const currentTab = useSearchParams().get(TAB) || (tabList[0].key as TTabKey);

  const Component: Record<TTabKey & string, JSX.Element> = {
    event: <RecommendEvent />,
    reviews: <RecommendReview />,
    hospitals: <RecommendHospital />,
  };

  return (
    <Suspense fallback={<LoadingSpinner backdrop />}>
      <TabComponent
        component={Component[currentTab as TTabKey]}
        currentTab={currentTab}
        list={tabList}
      />
    </Suspense>
  );
};

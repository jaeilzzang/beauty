"use client";

import TabComponent from "@/components/molecules/tab";

import {
  RecommendEvent,
  RecommendHospital,
  RecommendReview,
  TTabKey,
  tabList,
} from "./";
import { Suspense } from "react";
import LoadingSpinner from "@/components/atoms/loading/spinner";

interface RecommendTabProps {
  currentTab: string;
}

export const RecommendTab = ({ currentTab }: RecommendTabProps) => {
  const Component: Record<TTabKey & string, JSX.Element> = {
    event: <RecommendEvent />,
    reviews: <RecommendReview />,
    hospitals: <RecommendHospital />,
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TabComponent
        component={Component[currentTab as TTabKey]}
        currentTab={currentTab}
        list={tabList}
      />
    </Suspense>
  );
};

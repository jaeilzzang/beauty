import { tabList } from "./constants";

import TabComponent from "@/components/molecules/tab";

import LoadingSpinner from "@/components/atoms/loading/spinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const InfoTab = dynamic(() => import("./info"), {
  loading: () => <LoadingSpinner />,
});
const EventTab = dynamic(() => import("./event"), {
  loading: () => <LoadingSpinner />,
});
const ReviewTab = dynamic(() => import("./review"), {
  loading: () => <LoadingSpinner />,
});

interface HospitalTabProps {
  currentTab: string;
  id: string;
}

const HospitalTab = ({ currentTab, id }: HospitalTabProps) => {
  const Component: Record<string, JSX.Element> = {
    info: <InfoTab id={id} />,
    event: <EventTab id={id} />,
    review: <ReviewTab id={id} />,
  };

  return (
    <TabComponent
      component={
        <Suspense fallback={<LoadingSpinner />}>
          {Component[currentTab]}
        </Suspense>
      }
      currentTab={currentTab}
      list={tabList}
    />
  );
};

export default HospitalTab;

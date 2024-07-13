import { useSearchParams } from "next/navigation";

// import styles from "../styles/tab.module.scss";

import { tabList } from "./constants";

import TabComponent from "@/components/molecules/tab";

import InfoTab from "./info";
import EventTab from "./event";
import ReviewTab from "./review";

interface HospitalTabProps {
  currentTab: string;
}

const HospitalTab = ({ currentTab }: HospitalTabProps) => {
  console.log(currentTab);
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

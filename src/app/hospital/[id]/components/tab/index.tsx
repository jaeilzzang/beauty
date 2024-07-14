import { tabList } from "./constants";

import TabComponent from "@/components/molecules/tab";

import InfoTab from "./info";
import EventTab from "./event";
import ReviewTab from "./review";

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
      component={Component[currentTab]}
      currentTab={currentTab}
      list={tabList}
    />
  );
};

export default HospitalTab;

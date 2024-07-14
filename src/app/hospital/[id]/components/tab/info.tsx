import { getHospitalInfoAPI } from "@/app/hospital/api/info";
import styles from "./styles/info.module.scss";
import * as React from "react";

type TContent = { title: string; content: string };

interface InfoTabProps {
  id: string;
}

const InfoDataList: {
  id: number;
  title: string;
  content: "desc_address" | "desc_openninghour" | "desc_facilities";
}[] = [
  {
    id: 0,
    title: "Address",
    content: "desc_address",
  },
  {
    id: 1,
    title: "Opening Hour",
    content: "desc_openninghour",
  },
  {
    id: 2,
    title: "Facilities",
    content: "desc_facilities",
  },
];

const InfoTab = async ({ id }: InfoTabProps) => {
  const { data } = await getHospitalInfoAPI({ id });

  const infoData = data[0];
  const infoDetailData = infoData.hospital_details;

  const renderContent = ({ title, content }: TContent) => {
    return (
      <div className={styles.content_wrapper}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.content}>{content}</div>
      </div>
    );
  };

  return (
    <>
      {InfoDataList.map(({ id, title, content }) => {
        return (
          <React.Fragment key={id}>
            {renderContent({
              title,
              content: infoDetailData[content],
            })}
          </React.Fragment>
        );
      })}

      <div>
        {/* {infoData.longitude}
        {infoData.latitude} */}
        google map
      </div>
    </>
  );
};

export default InfoTab;

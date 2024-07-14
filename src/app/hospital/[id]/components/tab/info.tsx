import { getHospitalInfoAPI } from "@/app/hospital/api/info";
import styles from "./styles/info.module.scss";

type TContent = { title: string; content: string };

interface InfoTabProps {
  id: string;
}

const InfoTab = async ({ id }: InfoTabProps) => {
  const data = await getHospitalInfoAPI({ id });

  console.log(data, "info");

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
      {renderContent({ title: "Address", content: "123123" })}
      {renderContent({ title: "Opening Hour", content: "123123" })}
      {renderContent({ title: "Facilities", content: "123123" })}
      {renderContent({ title: "Doctors", content: "123123" })}

      <div>google map</div>
    </>
  );
};

export default InfoTab;

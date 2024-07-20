import { HospitalCard } from "@/components/molecules/card";

import styles from "./location-item.module.scss";
import { LocationData } from "@/app/api/location/location.dto";
import { ROUTE } from "@/router";

interface LocationItemProps {
  data: LocationData[];
}

export const LocationItem = ({ data }: LocationItemProps) => {
  return (
    <section className={styles.section}>
      {data.map(({ id_unique, name, imageurls }) => (
        <HospitalCard
          key={id_unique}
          src={imageurls[0]}
          alt={name}
          name={name}
          href={ROUTE.HOSPITAL_DETAIL("") + id_unique}
        />
      ))}
      {/* tab */}
      {/* <Tab /> */}
    </section>
  );
};

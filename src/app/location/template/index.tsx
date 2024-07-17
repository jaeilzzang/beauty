import { Map } from "@/components/common/map";
import styles from "./location-template.module.scss";
import { HospitalCard } from "@/components/molecules/card";
import { ROUTE } from "@/router";
import { LocationData } from "@/app/api/location/location.dto";
import PageHeader from "@/components/molecules/header/page-header";

export interface LocationPageTemplateProps {
  data: LocationData[];
  name?: string;
}

const LocationPageTemplate = ({ data, name }: LocationPageTemplateProps) => {
  const position = data.map(({ latitude, longitude, name }) => {
    return {
      lat: latitude,
      lng: longitude,
      title: name,
    };
  });

  return (
    <>
      <PageHeader name={name || data[0].name} />
      <div className={styles.map}>
        <Map coordinates={position} />
      </div>
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
    </>
  );
};

export default LocationPageTemplate;

import styles from "./Beauty.module.scss";
import Link from "next/link";
import ThumbnailImg from "@/components/molecules/img/thumbnail";
import { getHospitalLocationAPI } from "../../../api/home/hospital";
import { ROUTE } from "@/router";

const LocationHospital = async ({ locationNum }: { locationNum: string }) => {
  const { data } = await getHospitalLocationAPI({ locationNum });

  return (
    <div className={styles.article_wrapper}>
      {data.map(({ id, imageurls, name }) => (
        <article key={id}>
          <Link href={ROUTE.LOCATION_DETAIL("") + id}>
            <ThumbnailImg src={imageurls[0]} alt={name} />
          </Link>
        </article>
      ))}
    </div>
  );
};

export default LocationHospital;

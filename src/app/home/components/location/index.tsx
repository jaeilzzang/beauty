import { NoData } from "@/components/template/noData";

import styles from "./Beauty.module.scss";
import Link from "next/link";
import ThumbnailImg from "@/components/molecules/img/thumbnail";
import { getHospitalLocationAPI } from "../../api/hospital";

const LocationHospital = async ({ locationNum }: { locationNum: string }) => {
  const getBeauty = await getHospitalLocationAPI({ locationNum });

  if (!getBeauty.data.length) return <NoData />;

  return (
    <div className={styles.article_wrapper}>
      {getBeauty.data.map(({ id, imageurls, name }) => (
        <article key={id}>
          <Link href={"#"}>
            <ThumbnailImg src={imageurls[0]} alt={name} />
          </Link>
        </article>
      ))}
    </div>
  );
};

export default LocationHospital;

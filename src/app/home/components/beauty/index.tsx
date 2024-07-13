import { NoData } from "@/components/template/noData";

import styles from "./Beauty.module.scss";
import Link from "next/link";
import ThumbnailImg from "@/components/molecules/img/thumbnail";
import { getHospitalBeautyAPI } from "../../api/hospital";

const Beauty = async () => {
  const getBeauty = await getHospitalBeautyAPI();

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

export default Beauty;

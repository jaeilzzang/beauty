import { Banner } from "@/components/organism/layout/banner";
import Image from "next/image";
import Link from "next/link";

import styles from "./home.module.scss";

import { Chip } from "@/components/atoms/chip";
import { location } from "@/constants";
import { ROUTE } from "@/router";
import { getBannerAPI } from "./api/banner";
import { getHospitalBeautyAPI, getHospitalLocationAPI } from "./api/hospital";
import { NoData } from "@/components/template/noData";
import ThumbnailImg from "@/components/molecules/img/thumbnail";

export default async function Home({
  searchParams,
}: {
  searchParams: { locationNum: string };
}) {
  // const bannerItem = await getBannerAPI();
  const getBeauty = await getHospitalBeautyAPI();
  const getLocation = await getHospitalLocationAPI({
    locationNum: searchParams?.locationNum,
  });

  console.log(getLocation);

  return (
    <main>
      <Banner bannerItem={[]} />

      <section className={styles.section}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>New Beauty</h2>
          <p>Make Attraction</p>
        </div>

        {getBeauty.data.length ? (
          <div className={styles.article_wrapper}>
            {getBeauty.data.map(({ id, imageurls, name }) => (
              <article key={id}>
                <Link href={"#"}>
                  <ThumbnailImg src={imageurls[0]} alt={name} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </section>
      <section className={styles.section}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>Hospitals</h2>
          <p>Choose the region u want</p>
        </div>

        <div className={styles.location_wrapper}>
          {location.map((name, i) => (
            <Link
              key={name}
              href={{
                pathname: ROUTE.HOME,
                query: { locationNum: i },
              }}
              scroll={false}
            >
              <Chip>{name}</Chip>
            </Link>
          ))}
        </div>

        {getLocation.data.length ? (
          <div className={styles.article_wrapper}>
            {getLocation.data.map(({ id, imageurls, name }) => (
              <article key={id}>
                <Link href={ROUTE.HOSPITAL_DETAIL + id}>
                  <ThumbnailImg src={imageurls[0]} alt={name} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </section>
    </main>
  );
}

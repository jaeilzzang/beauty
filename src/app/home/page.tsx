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

  return (
    <main>
      <Banner bannerItem={[]} />

      <section className={styles.section}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>New Beauty</h2>
          <p>Make Attraction</p>
        </div>

        {getBeauty.length ? (
          <div className={styles.article_wrapper}>
            {getBeauty.map(({ id, imageurls, name }) => (
              <article key={id}>
                <Link href={"#"}>
                  <div className={styles.thumbnail_box}>
                    <Image
                      fill
                      src={imageurls[0]}
                      alt={name}
                      placeholder="blur"
                      blurDataURL="/hospitalimg/hospital_default.png"
                    />
                  </div>
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
                  <div className={styles.thumbnail_box}>
                    <Image
                      fill
                      src={imageurls[0]}
                      alt={name}
                      placeholder="blur"
                      blurDataURL="/hospitalimg/hospital_default.png"
                    />
                  </div>
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

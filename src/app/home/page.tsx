import { Banner } from "@/components/organism/layout/banner";
import Image from "next/image";
import Link from "next/link";

import styles from "./home.module.scss";

import { Chip } from "@/components/atoms/chip";
import { location } from "@/constants";
import { ROUTE } from "@/router";
import { getBanner } from "@/app/api/banner";

export default async function Home() {
  const bannerItem = await getBanner();

  return (
    <main>
      <Banner bannerItem={bannerItem} />

      <section className={styles.section}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>New Beauty</h2>
          <p>Make Attraction</p>
        </div>
        <div className={styles.article_wrapper}>
          {Array.from({ length: 5 }, (v, i) => (
            <article key={i}>
              <Link href={"#"}>
                <div className={styles.thumbnail_box}>
                  <Image fill src={`/hospital/h${i + 1}.jpeg`} alt="h1" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>Hospitals</h2>
          <p>Choose the region u want</p>
        </div>

        <div className={styles.location_wrapper}>
          {location.map((el) => (
            <Link key={el} href={ROUTE.LOCATION_DETAIL + el}>
              <Chip>{el}</Chip>
            </Link>
          ))}
        </div>

        <div className={styles.article_wrapper}>
          {Array.from({ length: 5 }, (v, i) => (
            <article key={i}>
              <Link href={ROUTE.HOSPITAL_DETAIL + i}>
                <div className={styles.thumbnail_box}>
                  <Image fill src={`/hospital/h${i + 1}.jpeg`} alt="h1" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

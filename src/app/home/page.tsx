import { Banner } from "@/components/organism/Layout/banner";
import Image from "next/image";
import Link from "next/link";

import styles from "./home.module.scss";
import { Chip } from "@/components/atoms/chip";
import { location } from "@/constants";

export default function Home() {
  return (
    <main>
      <Banner />

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
                  <Image
                    fill
                    src={`/hospital/h${i + 1}.jpeg`}
                    alt="h1"
                    priority
                  />
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
            <Chip key={el}>{el}</Chip>
          ))}
        </div>

        <div className={styles.article_wrapper}>
          {Array.from({ length: 5 }, (v, i) => (
            <article key={i}>
              <Link href={"#"}>
                <div className={styles.thumbnail_box}>
                  <Image
                    fill
                    src={`/hospital/h${i + 1}.jpeg`}
                    alt="h1"
                    priority
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

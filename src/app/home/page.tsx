import { Banner } from "@/components/organism/layout/banner";
import Image from "next/image";
import Link from "next/link";

import styles from "./home.module.scss";

import { Chip } from "@/components/atoms/chip";
import { location } from "@/constants";
import { ROUTE } from "@/router";
import { getBannerAPI } from "./api/banner";

import Beauty from "./components/beauty";
import { Suspense } from "react";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import LocationHospital from "./components/location";

export default async function Home({
  searchParams,
}: {
  searchParams: { locationNum: string };
}) {
  // const bannerItem = await getBannerAPI();

  return (
    <main>
      <Banner bannerItem={[]} />

      <section className={styles.section}>
        {/* Beauty */}
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>New Beauty</h2>
          <p>Make Attraction</p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <Beauty />
        </Suspense>
      </section>

      {/* LocationHospital */}
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

        <Suspense fallback={<LoadingSpinner />}>
          <LocationHospital locationNum={searchParams?.locationNum} />
        </Suspense>
      </section>
    </main>
  );
}

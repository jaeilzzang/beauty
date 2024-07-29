import Link from "next/link";

import styles from "./home.module.scss";

import { Chip } from "@/components/atoms/chip";
import { location } from "@/constants";
import { ROUTE } from "@/router";
import { getBannerAPI } from "@/app/api/home/banner";

import Beauty from "./components/beauty";

import LocationHospital from "./components/location";
import { Banner } from "@/components/organism/layout/banner";
import { clsx } from "clsx";

export default async function Home({
  searchParams,
}: {
  searchParams: { locationNum: string };
}) {
  const bannerItem = await getBannerAPI();

  const renderLocalChip = () => {
    return (
      <div className={styles.location_wrapper}>
        {location.map((name, i) => {
          const selectChipStyle =
            (searchParams.locationNum === undefined && i === 0) ||
            +searchParams.locationNum === i;

          return (
            <Link
              className={clsx({
                [styles.select_chip]: selectChipStyle,
              })}
              key={name}
              href={`/home?locationNum=${i}`}
              scroll={false}
            >
              <Chip>{name}</Chip>
            </Link>
          );
        })}
        <Link href={ROUTE.LOCATION_DETAIL("") + "ALL"} scroll={true}>
          <Chip>{"See All"}</Chip>
        </Link>
      </div>
    );
  };

  return (
    <main>
      <Banner bannerItem={bannerItem.data} />

      <section className={styles.section}>
        {/* Beauty */}
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>New Beauty</h2>
          <p>Make Attraction</p>
        </div>

        <Beauty />
      </section>

      {/* LocationHospital */}
      <section className={styles.section}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>Hospitals</h2>
          <p>Choose the region u want</p>
        </div>
        {renderLocalChip()}
        <LocationHospital locationNum={searchParams?.locationNum} />
      </section>
    </main>
  );
}

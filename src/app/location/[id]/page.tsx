import Image from "next/image";
import React from "react";

import styles from "./locationDetail.module.scss";

const LocationDetailPage = () => {
  const Card = () => {
    return (
      <article>
        <div className={styles.thumbnail_box}>
          <Image fill src={`/hospital/h1.jpeg`} alt="h1" priority />
        </div>
        <p>hospital name</p>
      </article>
    );
  };

  return (
    <main>
      <div>google map</div>
      <section className={styles.section}>
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {Card()}
        {/* tab */}
        {/* <Tab /> */}{" "}
      </section>
    </main>
  );
};

export default LocationDetailPage;

"use client";

import Image from "next/image";

import styles from "./hospital-card.module.scss";

interface HospitalCardProps {
  src: string;
  alt: string;

  onSelect?: (name: string) => void;

  name: string;
}

export const HospitalCard = ({
  alt,
  src,
  name,
  onSelect,
}: HospitalCardProps) => {
  return (
    <article
      className={styles.hospital_card_wrapper}
      onClick={() => onSelect && onSelect(name)}
    >
      <div className={styles.thumbnail_box}>
        <Image fill src={src} alt={alt} priority />
      </div>
      <p className={styles.name}>{name}</p>
    </article>
  );
};

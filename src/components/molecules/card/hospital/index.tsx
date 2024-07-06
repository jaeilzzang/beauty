import Image from "next/image";

import styles from "./hospital-card.module.scss";

interface HospitalCardProps {
  src: string;
  alt: string;

  name: string;
}

export const HospitalCard = ({ alt, src, name }: HospitalCardProps) => {
  return (
    <article>
      <div className={styles.thumbnail_box}>
        <Image fill src={src} alt={alt} priority />
      </div>
      <p className={styles.name}>{name}</p>
    </article>
  );
};

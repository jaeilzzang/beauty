import styles from "./page-header.module.scss";
import Image from "next/image";

interface PageHeaderProps {
  name: string;
}

const PageHeader = ({ name }: PageHeaderProps) => {
  return (
    <div className={styles.header}>
      <h1>{name}</h1>

      <Image
        className={styles.favorite}
        src="/icons/icon_favorite_disable.svg"
        alt="favorite"
        width={24}
        height={24}
      />
    </div>
  );
};

export default PageHeader;

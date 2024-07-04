import { PropsWithChildren } from "react";
import styles from "./chip.module.scss";

export const Chip = ({ children }: PropsWithChildren) => {
  return <span className={styles.chip}>{children}</span>;
};

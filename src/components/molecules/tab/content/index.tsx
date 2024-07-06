import styles from "./tab-content.module.scss";

const TabContent = ({ component: Component }: { component: JSX.Element }) => {
  return <section className={styles.section}>{Component}</section>;
};

export default TabContent;

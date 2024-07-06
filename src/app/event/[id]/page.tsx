import { Chip } from "@/components/atoms/chip";

import ImageBox from "@/components/atoms/image";

import styles from "./event-detail.module.scss";

const EventDetailPage = () => {
  return (
    <main className="container">
      <section className={styles.section}>
        <ImageBox src="/banner/banner1.jpeg" alt="'123" />
        <div>
          <h1>이벤트명</h1>
          <p>이벤트 유효날짜</p>
        </div>

        <div className={styles.surgical}>
          <h2>Surgeries Package</h2>
          <ul className={styles.surgical_ul}>
            <li>
              <Chip>Ulthera</Chip>
            </li>
            <li>
              <Chip>Themrage</Chip>
            </li>
            <li>
              <Chip>InMode</Chip>
            </li>
            <li>
              <Chip>Shrink</Chip>
            </li>
          </ul>
        </div>

        <div>desctip</div>

        <div className={styles.hospital}>
          <div className={styles.hospital_img}>
            <ImageBox src="" alt="" />
          </div>
          <div className={styles.hospital_info}>
            <p>name</p>
            <p>병원보기</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetailPage;

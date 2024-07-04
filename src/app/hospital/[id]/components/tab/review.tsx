import Image from "next/image";

import styles from "../styles/review.module.scss";

const renderTest = () => {
  return (
    <article className={styles.review}>
      <div className={styles.thumbnail}>
        <Image fill src={"/img/thumbnail.jpeg"} alt="thumbnail" />
      </div>

      <div className={styles.content}>
        <p className={styles.review_content}>
          이벤트 초과하는건 밑줄로 표현하기이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
        </p>

        <div className={styles.review_footer}>
          <p className={styles.id}>id</p>
          <p className={styles.hospital}>병원이름</p>
        </div>
      </div>
    </article>
  );
};

const ReviewTab = () => {
  return (
    <>
      {renderTest()}
      {renderTest()}
      {renderTest()}
      {renderTest()}
      {renderTest()}
      {renderTest()}
      {renderTest()}
      {renderTest()}
    </>
  );
};

export default ReviewTab;

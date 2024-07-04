import React from "react";
import Image from "next/image";

import styles from "../styles/event.module.scss";

const renderTest = () => {
  return (
    <article className={styles.event}>
      <div className={styles.thumbnail}>
        <Image fill src={"/img/thumbnail.jpeg"} alt="thumbnail" />
      </div>

      <div className={styles.content}>
        <p className={styles.name}>예쁘니까 울랄라</p>
        <p className={styles.date}>{new Date().toISOString()}</p>
        <p className={styles.desc}>
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
      </div>
    </article>
  );
};

const EventTab = () => {
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
      {renderTest()}
      {renderTest()}
      {renderTest()}
      {renderTest()}
    </>
  );
};

export default EventTab;

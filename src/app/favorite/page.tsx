"use client";

import { HospitalCard } from "@/components/molecules/card";

import styles from "./favorite.module.scss";
import { useState } from "react";

const FavoritePage = () => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string[]>([]);

  const onReset = () => {
    setSelectMode(!selectMode);
    setSelectItem([]);
  };

  const onSelect = (item: string) => {
    if (!selectMode) return;

    setSelectItem((prev) => {
      const isFilter = prev.find((e) => e === item);

      if (isFilter) return prev;

      return [...prev, item];
    });
  };

  console.log(selectItem);

  return (
    <main>
      <div className={styles.btn_wrapper}>
        {selectMode ? (
          <div>
            <button>삭제</button>
            <button onClick={onReset}>취소</button>
          </div>
        ) : (
          <button onClick={onReset}>선택</button>
        )}
      </div>

      <div className={styles.card_wrapper}>
        <div className={styles.card} onClick={() => onSelect("123")}>
          {/* // checkbox version */}
          {/* <input type="checkbox" className={styles.check} /> */}

          {/* check icon version */}
          <div className={styles.check}>check</div>
          <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"123"} />
        </div>
        <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"1"} />
        <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"2"} />
        <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"3"} />
        <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"4"} />
        <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"11"} />
        <HospitalCard src={"/banner/banner1.jpeg"} alt={""} name={"22"} />
      </div>
    </main>
  );
};

export default FavoritePage;

"use client";

import ModalOverlay from "@/components/organism/layout/modal/overlay";

import styles from "./search-modal.module.scss";
import { ChangeEventHandler, useState } from "react";

interface SearchModalProps {
  open: boolean;

  itemList: Array<string>;

  onClick: (value: string) => void;

  onCancel: () => void;
}

export const SearchModal = ({
  open,
  onClick,
  onCancel,
  itemList,
}: SearchModalProps) => {
  const [searchList, setSearchList] = useState<typeof itemList>(itemList);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value.toLowerCase();

    const findItem = itemList.filter((e) => {
      const item = e.toLowerCase();

      return item.includes(search);
    });

    setSearchList(findItem);
  };

  return (
    <ModalOverlay open={open} handleClick={onCancel}>
      <div>
        <input
          className={styles.search}
          placeholder="Search"
          onChange={handleOnChange}
          // value={search}
        />
        <ul className={styles.ul}>
          {searchList.map((name, i) => (
            <li
              key={i}
              className={styles.li}
              onClick={() => {
                onClick(name);
                onCancel();
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </ModalOverlay>
  );
};

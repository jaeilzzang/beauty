"use client";

import { HospitalCard } from "@/components/molecules/card";

import styles from "./favorite.module.scss";
import { useState } from "react";

import { deleteFavoriteAPI, getAllFavoriteAPI } from "../api/auth/favorite";

import { InfinityItemList } from "@/components/template/InfinityItem";
import PageHeader from "@/components/molecules/header/page-header";
import { ROUTE } from "@/router";
import { FavoriteIcon } from "@/components/icons/favoriteIcon";
import Button from "@/components/atoms/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

const FavoritePage = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string[]>([]);

  const { mutate } = useMutation({
    mutationFn: deleteFavoriteAPI,
    onSuccess: () => {
      // 캐시초기화
      queryClient.invalidateQueries({
        queryKey: ["favorite_list", 0],
      });
      router.refresh();
    },
  });

  const handleReset = () => {
    setSelectMode(!selectMode);
    setSelectItem([]);
  };

  const handleSelect = (item: string) => {
    if (!selectMode) return;

    setSelectItem((prev) => {
      const isFilter = prev.find((e) => e === item);

      if (isFilter) return prev.filter((e) => e !== isFilter);

      return [...prev, item];
    });
  };

  const handleDelete = () => {
    mutate({ id_hospital: JSON.stringify(selectItem) });
  };

  const isFavorite = (id: string) => selectItem.includes(id);
  const href = (id: string) =>
    selectMode ? "#" : ROUTE.HOSPITAL_DETAIL("") + id;

  return (
    <main>
      <PageHeader name="Favorite">
        <div className={styles.btn_wrapper}>
          {selectMode ? (
            <div className={styles.remove_btn}>
              <Button color="blue" onClick={handleDelete}>
                Delete
              </Button>
              <Button color="blue" onClick={handleReset}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button color="blue" onClick={handleReset}>
              Edit
            </Button>
          )}
        </div>
      </PageHeader>

      <InfinityItemList
        className={styles.card_wrapper}
        fetchFn={getAllFavoriteAPI}
        queryKey="favorite_list"
      >
        {(data) =>
          data.favorite.map(({ id, hospital }) => {
            return (
              <div
                key={id}
                className={styles.card}
                onClick={() => handleSelect(hospital.id_unique)}
              >
                <div className={styles.favorite_icon}>
                  <FavoriteIcon
                    fill={isFavorite(hospital.id_unique) ? "red" : "white"}
                  />
                </div>
                <HospitalCard
                  alt={hospital.name}
                  name={hospital.name}
                  href={href(hospital.id_unique)}
                  src={hospital.imageurls[0]}
                />
              </div>
            );
          })
        }
      </InfinityItemList>
    </main>
  );
};

export default FavoritePage;

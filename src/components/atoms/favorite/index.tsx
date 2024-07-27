"use client";

import Image from "next/image";
import styles from "./favorite.module.scss";

import { useParams } from "next/navigation";
import { useOptimistic } from "react";
import { favoriteActions } from "./actions";

export interface FavoriteIconProps {
  isFavorite: boolean;
}

export const HospitalFavoriteIcon = ({ isFavorite }: FavoriteIconProps) => {
  const params: { id: string } = useParams();
  const id_hospital = params.id;

  const [optimisticState, isOptimisticFavorite] = useOptimistic(
    isFavorite,
    (prevState) => {
      return !prevState;
    }
  );

  const updateFavorite = async () => {
    isOptimisticFavorite(isFavorite);

    await favoriteActions({
      isFavorite: optimisticState,
      id_hospital,
    });
  };

  return (
    <form action={updateFavorite}>
      <button className={styles.btn}>
        <Image
          src={`/icons/icon_favorite_${
            optimisticState ? "disable" : "enable"
          }.svg`}
          alt="favorite"
          width={24}
          height={24}
        />
      </button>
    </form>
  );
};

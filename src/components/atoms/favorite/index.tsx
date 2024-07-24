"use client";

import Image from "next/image";
import styles from "./favorite.module.scss";
import { useMutation } from "@tanstack/react-query";
import { deleteFavoriteAPI, postFavoriteAPI } from "@/app/api/auth/favorite";
import { useParams, useRouter } from "next/navigation";

export interface FavoriteIconProps {
  isFavorite?: boolean;
}

export const HospitalFavoriteIcon = ({ isFavorite }: FavoriteIconProps) => {
  const router = useRouter();
  const params: { id: string } = useParams();
  const id_hospital = params.id;

  const { mutate } = useMutation({
    mutationFn: isFavorite ? deleteFavoriteAPI : postFavoriteAPI,
    onSuccess: () => {
      router.refresh();
    },
  });

  if (isFavorite === undefined) return null;

  return (
    <Image
      src={`/icons/icon_favorite_${isFavorite ? "disable" : "enable"}.svg`}
      alt="favorite"
      width={24}
      height={24}
      onClick={() => mutate({ id_hospital })}
    />
  );
};

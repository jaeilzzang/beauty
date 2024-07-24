import { fetchUtils } from "@/utils/fetch";
import {
  DeleteFavoriteInputDto,
  GetFavoriteInputDto,
  GetFavoriteOutputDto,
  PostFavoriteInputDto,
} from "./favorite.dto";

import { InfinityScrollInputDto } from "@/types/infinite";

export const getAllFavoriteAPI = async ({
  pageParam = 0,
}: InfinityScrollInputDto) => {
  const res = await fetchUtils<GetFavoriteOutputDto>({
    url: `http://localhost:3000/api/auth/favorite?&pageParam=${pageParam}`,
  });

  return res;
};

export const getFavoriteAPI = async ({
  id_hospital,
}: GetFavoriteInputDto): Promise<GetFavoriteOutputDto[]> => {
  const queryParams = new URLSearchParams({});

  if (id_hospital) {
    queryParams.append("id_hospital", id_hospital);
  }

  const res = await fetchUtils<GetFavoriteOutputDto[]>({
    url: `http://localhost:3000/api/auth/favorite?${queryParams.toString()}`,
  });

  return res;
};

export const postFavoriteAPI = async ({
  id_hospital,
}: PostFavoriteInputDto) => {
  const queryParams = new URLSearchParams({});

  if (window.location.pathname) {
    queryParams.append("path", window.location.pathname);
  }

  const body = JSON.stringify({ id_hospital });

  const res = await fetchUtils<{ redirect: string }>({
    url: `http://localhost:3000/api/auth/favorite?${queryParams.toString()}`,
    fetchOptions: {
      method: "POST",
      body,
    },
  });

  return res;
};

export const deleteFavoriteAPI = async ({
  id_hospital,
}: DeleteFavoriteInputDto) => {
  const queryParams = new URLSearchParams({});

  if (window.location.pathname) {
    queryParams.append("path", window.location.pathname);
  }

  const body = JSON.stringify({ id_hospital });

  const res = await fetchUtils<{ redirect: string }>({
    url: `http://localhost:3000/api/auth/favorite?${queryParams.toString()}`,
    fetchOptions: {
      method: "DELETE",
      body,
    },
  });

  return res;
};

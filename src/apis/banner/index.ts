import { BannerOutputDto } from "./banner.dto";

export const getBanner = async (): Promise<BannerOutputDto[]> => {
  const res = await fetch("http://localhost:3000/api/banner");

  if (!res.ok) {
    throw new Error("API ERROR");
  }

  const { data } = await res.json();

  return data;
};

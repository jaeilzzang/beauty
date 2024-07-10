import { fetchUtils } from "@/utils/fetch";
import { BannerOutputDto } from "./banner.dto";

export const getBanner = async (): Promise<BannerOutputDto[]> => {
  const url = "http://localhost:3000/home/api/banner";

  const data = await fetchUtils<BannerOutputDto[]>({ url });

  return data ?? [];
};

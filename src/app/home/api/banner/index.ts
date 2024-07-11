import { fetchUtils } from "@/utils/fetch";
import { BannerOutputDto } from "./banner.dto";

export const getBannerAPI = async (): Promise<BannerOutputDto[]> => {
  const url = "http://localhost:3000/home/api/banner";

  const data = await fetchUtils<BannerOutputDto[]>({ url });

  return data ?? [];
};

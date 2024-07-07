import { fetchUtils } from "@/utils/fetch";
import { BannerOutputDto } from "./banner.dto";

export const getBanner = async (): Promise<BannerOutputDto[]> => {
  const url = "http://localhost:3000/api/banner";

  return await fetchUtils<BannerOutputDto[]>({ url });
};

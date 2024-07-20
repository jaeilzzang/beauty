import { fetchUtils } from "@/utils/fetch";
import { BannerOutputDto } from "./banner.dto";

export const getBannerAPI = async (): Promise<BannerOutputDto> => {
  const url = "http://localhost:3000/api/home/banner";

  const data = await fetchUtils<BannerOutputDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? [];
};

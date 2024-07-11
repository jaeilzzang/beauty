import { fetchUtils } from "@/utils/fetch";
import { HospitalBeautyOutputDto } from "./hospital-beauty.dto";

export const getHospitalBeautyAPI = async () => {
  const url = "http://localhost:3000/home/api/hospital/beauty";

  const data = await fetchUtils<HospitalBeautyOutputDto[]>({ url });

  return data ?? [];
};

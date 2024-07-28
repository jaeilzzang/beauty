import { fetchUtils } from "@/utils/fetch";
import { HospitalBeautyOutputDto } from "./hospital-beauty.dto";

export const getHospitalBeautyAPI = async () => {
  console.log(process.env.NEXT_PUBLIC_API_ROUTE);
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/home/hospital/beauty`;

  const data = await fetchUtils<HospitalBeautyOutputDto>({ url });

  return data;
};

import { fetchUtils } from "@/utils/fetch";
import { HospitalOutputDto } from "./hospital.dto";

export const getHospital = async () => {
  const url = "http://localhost:3000/home/api/hospital";

  const data = await fetchUtils<HospitalOutputDto[]>({ url });

  return data ?? [];
};

import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailMainInputDto,
  HospitalDetailMainOutput,
} from "./main.dto";

export const getHospitalMainAPI = async ({
  id,
}: HospitalDetailMainInputDto): Promise<HospitalDetailMainOutput> => {
  const url = `http://localhost:3000/hospital/api/main?id=${id}`;

  const data = await fetchUtils<HospitalDetailMainOutput>({ url });

  return data ?? [];
};

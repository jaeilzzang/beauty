import { fetchUtils } from "@/utils/fetch";
import {
  SurgeriesHospitalInputDto,
  SurgeriesHospitalOutputDto,
} from "./surgeries-info.dto";

export const getSurgeriesHospitalAPI = async ({
  id,
  pageParam,
}: SurgeriesHospitalInputDto): Promise<SurgeriesHospitalOutputDto> => {
  const url = `http://localhost:3000/api/surgeries/${id}/hospital?pageParam=${pageParam}`;

  const data = await fetchUtils<SurgeriesHospitalOutputDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? [];
};

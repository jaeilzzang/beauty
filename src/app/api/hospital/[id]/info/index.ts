import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailInfoInputDto,
  HospitalDetailInfoOutDto,
} from "./info.dto";

export const getHospitalInfoAPI = async ({
  id,
}: HospitalDetailInfoInputDto): Promise<HospitalDetailInfoOutDto> => {
  const url = `http://localhost:3000/api/hospital/${id}/info`;

  const data = await fetchUtils<HospitalDetailInfoOutDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? [];
};

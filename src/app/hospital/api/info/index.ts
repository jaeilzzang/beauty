import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailInfoInputDto,
  HospitalDetailInfoOutDto,
} from "./info.dto";

export const getHospitalInfoAPI = async ({
  id,
}: HospitalDetailInfoInputDto): Promise<HospitalDetailInfoOutDto> => {
  const url = `http://localhost:3000/hospital/api/info?id=${id}`;

  const data = await fetchUtils<HospitalDetailInfoOutDto>({ url });

  return data ?? [];
};

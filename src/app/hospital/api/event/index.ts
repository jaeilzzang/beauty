import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailEventInputDto,
  HospitalDetailEventOutDto,
} from "./event.dto";

export const getHospitalEventAPI = async ({
  id,
}: HospitalDetailEventInputDto): Promise<HospitalDetailEventOutDto> => {
  const url = `http://localhost:3000/hospital/api/event?id=${id}`;

  const data = await fetchUtils<HospitalDetailEventOutDto>({ url });

  return data ?? [];
};

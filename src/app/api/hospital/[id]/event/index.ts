import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailEventInputDto,
  HospitalDetailEventOutDto,
} from "./event.dto";

export const getHospitalEventAPI = async ({
  id,
  pageParam = 0,
}: HospitalDetailEventInputDto): Promise<HospitalDetailEventOutDto> => {
  const url = `http://localhost:3000/api/hospital/${id}/event?pageParam=${pageParam}`;

  const data = await fetchUtils<HospitalDetailEventOutDto>({ url });

  return data ?? { data: [], nextCursor: undefined };
};

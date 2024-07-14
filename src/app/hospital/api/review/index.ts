import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailReviewInputDto,
  HospitalDetailReviewOutDto,
} from "./review";

export const getHospitalReviewAPI = async ({
  id,
}: HospitalDetailReviewInputDto): Promise<HospitalDetailReviewOutDto> => {
  const url = `http://localhost:3000/hospital/api/review?id=${id}`;

  const data = await fetchUtils<HospitalDetailReviewOutDto>({ url });

  return data ?? [];
};

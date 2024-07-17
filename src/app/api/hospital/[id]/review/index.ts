import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailReviewInputDto,
  HospitalDetailReviewOutDto,
} from "./review";

export const getHospitalReviewAPI = async ({
  id,
}: HospitalDetailReviewInputDto): Promise<HospitalDetailReviewOutDto> => {
  const url = `http://localhost:3000/api/hospital/${id}/review`;

  const data = await fetchUtils<HospitalDetailReviewOutDto>({ url });

  return data ?? [];
};

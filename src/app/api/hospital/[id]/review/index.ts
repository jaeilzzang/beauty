import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailReviewInputDto,
  HospitalDetailReviewOutDto,
} from "./review";

export const getHospitalReviewAPI = async ({
  id,
  pageParam = 0,
}: HospitalDetailReviewInputDto): Promise<HospitalDetailReviewOutDto> => {
  const url = `http://localhost:3000/api/hospital/${id}/review?pageParam=${pageParam}`;

  const data = await fetchUtils<HospitalDetailReviewOutDto>({ url });

  return data ?? { data: [], nextCursor: undefined };
};

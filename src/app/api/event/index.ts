import { fetchUtils } from "@/utils/fetch";
import { AllEventInputDto, AllEventOutputDto } from "./event.dto";

export const getAllEventAPI = async ({
  pageParam,
}: AllEventInputDto): Promise<AllEventOutputDto> => {
  const url = `http://localhost:3000/api/event?pageParam=${pageParam}}`;

  const data = await fetchUtils<AllEventOutputDto>({
    url,
  });

  return data;
};

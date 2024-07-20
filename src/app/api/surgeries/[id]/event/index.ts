import { fetchUtils } from "@/utils/fetch";
import {
  SurgeriesEventInputDto,
  SurgeriesEventOutputDto,
} from "./surgeries-event.dto";

export const getSurgeriesEventAPI = async ({
  id,
  pageParam,
}: SurgeriesEventInputDto): Promise<SurgeriesEventOutputDto> => {
  const url = `http://localhost:3000/api/surgeries/${id}/event?pageParam=${pageParam}`;

  const data = await fetchUtils<SurgeriesEventOutputDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? [];
};

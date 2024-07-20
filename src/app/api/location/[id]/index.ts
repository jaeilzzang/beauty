import { fetchUtils } from "@/utils/fetch";
import {
  LocationDetailInputDto,
  LocationDetailOutputDto,
} from "./location.dto";

export const getLocationDetailAPI = async ({
  id,
  pageParam,
}: LocationDetailInputDto): Promise<LocationDetailOutputDto> => {
  const url = `http://localhost:3000/api/location/${id}?pageParam=${pageParam}`;

  const data = await fetchUtils<LocationDetailOutputDto>({
    url,
  });

  return data ?? [];
};

import { fetchUtils } from "@/utils/fetch";
import {
  LocationDetailInputDto,
  LocationDetailOutputDto,
} from "./location.dto";

export const getLocationDetailAPI = async ({
  id,
}: LocationDetailInputDto): Promise<LocationDetailOutputDto> => {
  const url = `http://localhost:3000/api/location/${id}`;

  const data = await fetchUtils<LocationDetailOutputDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? [];
};

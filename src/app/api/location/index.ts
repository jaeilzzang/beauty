import { fetchUtils } from "@/utils/fetch";
import { LocationOutputDto } from "./location.dto";

export const getLocationAPI = async (): Promise<LocationOutputDto> => {
  const url = `http://localhost:3000/api/location`;

  const data = await fetchUtils<LocationOutputDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? [];
};

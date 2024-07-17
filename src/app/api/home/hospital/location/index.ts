import { fetchUtils } from "@/utils/fetch";
import {
  HospitalLocationInputDto,
  HospitalLocationOutputDto,
} from "./hospital-location.dto";

//todo paging
export const getHospitalLocationAPI = async ({
  locationNum = "0",
}: HospitalLocationInputDto) => {
  const url =
    "http://localhost:3000/api/home/hospital/location" +
    `?locationNum=${locationNum}`;

  const data = await fetchUtils<HospitalLocationOutputDto>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data ?? { data: [], total: 0 };
};

import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailMainInputDto,
  HospitalDetailMainOutput,
} from "./main.dto";

export const getHospitalMainAPI = async ({
  id,
}: HospitalDetailMainInputDto): Promise<HospitalDetailMainOutput> => {
  const url = `http://localhost:3000/api/hospital/${id}/main`;

  const data = await fetchUtils<HospitalDetailMainOutput>({
    url,
    fetchOptions: {
      cache: "no-cache",
    },
  });

  return data ?? [];
};

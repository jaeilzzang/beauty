import { fetchUtils } from "@/utils/fetch";
import {
  HospitalDetailMainInputDto,
  HospitalDetailMainOutput,
} from "./main.dto";

export const getHospitalMainAPI = async ({
  id,
}: HospitalDetailMainInputDto): Promise<HospitalDetailMainOutput> => {
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/hospital/${id}/main`;

  const data = await fetchUtils<HospitalDetailMainOutput>({
    url,
    fetchOptions: {
      cache: "no-cache",
    },
  });

  return data ?? [];
};

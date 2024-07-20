import { fetchUtils } from "@/utils/fetch";
import { PositionInputDto, PositionOutputDto } from "./position.dto";

export const getPositionAPI = async ({
  id,
}: PositionInputDto): Promise<PositionOutputDto> => {
  const url = `http://localhost:3000/api/location/${id}/position`;

  const data = await fetchUtils<PositionOutputDto>({ url });

  return data ?? [];
};

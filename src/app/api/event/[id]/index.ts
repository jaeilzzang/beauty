import { fetchUtils } from "@/utils/fetch";
import { EventDetailInputDto, EventDetailOutput } from "./event.dto";

export const getEventDetailAPI = async ({
  id,
}: EventDetailInputDto): Promise<EventDetailOutput> => {
  const url = `http://localhost:3000/api/event/${id}`;

  const data = await fetchUtils<EventDetailOutput>({
    url,
    fetchOptions: { cache: "no-cache" },
  });

  return data;
};

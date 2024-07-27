import { fetchUtils } from "@/utils/fetch";
import { CountryOutputDto } from "./country-code";

export const getCountryCodeAPI = async (): Promise<CountryOutputDto | null> => {
  const res = await fetchUtils<CountryOutputDto>({
    url: `http://localhost:3000/api/auth/countryCode`,
  });

  return res;
};

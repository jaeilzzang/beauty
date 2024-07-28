import { fetchUtils } from "@/utils/fetch";
import { CountryOutputDto } from "./country-code";

export const getCountryCodeAPI = async (): Promise<CountryOutputDto | null> => {
  const res = await fetchUtils<CountryOutputDto>({
    url: `${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/countryCode`,
  });

  return res;
};

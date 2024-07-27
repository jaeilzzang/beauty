import { fetchUtils } from "@/utils/fetch";

export const sendCodeAPI = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  const res = await fetchUtils<Response>({
    url: `http://localhost:3000/api/auth/sendCode?email=${email}`,
  });

  return res;
};

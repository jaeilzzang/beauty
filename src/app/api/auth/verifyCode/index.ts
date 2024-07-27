import { fetchUtils } from "@/utils/fetch";

export const verifyCodeAPI = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const body = JSON.stringify({
    email,
    token,
  });

  const res = await fetchUtils<Response>({
    url: `http://localhost:3000/api/auth/verifyCode`,
    fetchOptions: {
      method: "POST",
      body,
    },
  });

  return res;
};

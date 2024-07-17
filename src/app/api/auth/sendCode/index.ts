import { fetchUtils } from "@/utils/fetch";

export const sendCodeMutationFn = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  const res = await fetchUtils<Response>({
    url: `http://localhost:3000/api/auth/email-verification/sendCode?email=${email}`,
  });

  if (!res.ok) {
    // 보여주고 싶은 error message 매핑해서 사용할것
    // https://supabase.com/docs/reference/javascript/auth-error-codes
    // ex) statusText = over_email_send_rate_limit
    // Too many emails have been sent to this email address. Ask the user to wait a while before trying again.
    throw new Error(res.statusText);
  }

  return res.json();
};

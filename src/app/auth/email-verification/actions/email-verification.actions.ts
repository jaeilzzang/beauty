"use server";

import { country } from "@/constants/country";
import { ROUTE } from "@/router";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const verifyActions = async (prevState: any, formData: FormData) => {
  const supabase = createClient();

  const requestHeaders = headers();
  const fullUrl = requestHeaders.get("referer") || "";

  const url = new URL(fullUrl);
  const searchParams = new URLSearchParams(url.search);

  const userInfo = Object.fromEntries(searchParams.entries());

  const code = formData.get("code") as string;

  const verifyCode = await supabase.auth.verifyOtp({
    email: userInfo.email,
    token: code,
    type: "email",
  });
  console.log(verifyCode);

  if (verifyCode.error) {
    return {
      ...prevState,
      message: verifyCode.error.code as string,
    };
  }

  console.log(userInfo, "param"); // Log

  const countryCode = country.find(
    (e) => e.country_name === userInfo.country_name
  );

  const insertDb: Record<string, string> = {};
  const requireKey = ["email", "nickname", "name"];

  for (let key in userInfo) {
    if (requireKey.includes(key)) insertDb[key] = userInfo[key];
  }

  // user 테이블 insert
  const saveUserProfile = await supabase.from("user").insert({
    ...insertDb,
    id_country: countryCode,
    uid: verifyCode.data.user?.id,
  });

  console.log(saveUserProfile);

  if (saveUserProfile.error) {
    return { ...prevState, message: saveUserProfile.error.code };
  }

  // redirect(ROUTE.HOME);
};

export default verifyActions;

import { getUserAPI } from "@/app/api/auth/getUser";

import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const getUser = useQuery({
    queryKey: ["getUser"],
    queryFn: getUserAPI,
  });

  return getUser;
};

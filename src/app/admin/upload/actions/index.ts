"use server";

import { createClient } from "@/utils/supabase/server";

export const uploadActions = async (prevState: any, formData: FormData) => {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const surgeries = formData.get("surgeries") as string;
  const searchkey = formData.get("searchkey") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;
  const location = formData.get("location") as string;
  const imageurls = formData.getAll("imageurls");

  const filenames = await Promise.all(
    imageurls
      .filter((entry) => entry instanceof File)
      .map(async (e) => {
        const upload = await supabase.storage
          .from("images")
          .upload(`hospitalimg/${e.name}`, e);

        if (upload.error) {
          return {
            ...prevState,
            message: upload.error.message,
          };
        }

        return `${process.env.NEXT_PUBLIC_IMG_URL}${upload.data?.path}`;
      })
  );

  if (filenames.find((e) => e.message)) {
    return {
      ...prevState,
      message: filenames,
    };
  }

  const lastUnique = await supabase
    .from("hospital")
    .select("id_unique")
    .order("id_unique", { ascending: false })
    .limit(1);

  if (!lastUnique.data || lastUnique.error) {
    return {
      ...prevState,
      message: lastUnique.error.code || lastUnique.error.message,
    };
  }

  const form = {
    id_unique: lastUnique.data[0].id_unique + 1,
    name,
    id_surgeries: surgeries.split(","),
    searchkey,
    latitude,
    longitude,
    location,
    imageurls: filenames,
  };

  const insertHospital = await supabase.from("hospital").insert(form);

  if (insertHospital.error) {
    const filenames = imageurls.filter((entry) => entry instanceof File);

    const remove = await supabase.storage
      .from("images")
      .remove(filenames.map((e) => `hospitalimg/${e.name}`));

    const error = remove.error || insertHospital.error;

    if (error) {
      return {
        ...prevState,
        message: error.message,
      };
    }
  }

  return {
    ...prevState,
    message: "success",
  };
};

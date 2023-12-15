"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addLink = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const href = formData.get("href") as string;

  let insertHref, insertTitle;

  try {
    const ogs = require("open-graph-scraper");
    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
    const options = {
      url: href,
      fetchOptions: { headers: { "user-agent": userAgent } },
    };
    const ogsData = await ogs(options);

    const { error: ogsErr, html, result, response } = ogsData;

    insertHref = result.ogUrl;
    insertTitle = result.ogTitle;
  } catch (error: any) {
    insertHref = null;
    insertTitle = error.result.requestUrl;
  }

  // console.log("error------:", ogsErr); // This returns true or false. True if there was an error. The error itself is inside the result object.
  // console.log("result-----:", result); // This contains all of the Open Graph results

  // console.log(insertTitle);
  const { data, error } = await supabase
    .from("links")
    .insert({ href: insertHref, title: insertTitle, user_id: user?.id });

  if (error) {
    console.log("error: ", error);
  }

  return revalidatePath("/");
};

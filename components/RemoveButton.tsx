import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Profile } from "@/utils/supabase/types";
import { Database } from "@/app/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export default async function RemoveButton({
  val,
  col,
}: {
  val: string;
  col: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore) as SupabaseClient<Database>;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const { data: profile } = await supabase
  //   .from("profiles")
  //   .select()
  //   .eq("user_id", user?.id)
  //   .single();

  const removeExcludedUser = async (formData: FormData) => {
    "use server";

    // const userId = formData.get("name") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: profile } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", user?.id)
      .single();

    const elToRemove = val;

    const newExclude = profile[col]
      ? profile[col].filter((el: string) => el !== elToRemove)
      : null;

    const { data, error } = await supabase
      .from("profiles")
      // .select()
      .update({
        [col]: [...newExclude],
      })
      .eq("user_id", user?.id)
      .select()
      .single();

    // console.log(data, error);
    if (error) return;
    revalidatePath("/");
  };

  return (
    <form action={removeExcludedUser}>
      <button className="p-2 rounded-full no-underline hover:bg-black/30 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </form>
  );
}

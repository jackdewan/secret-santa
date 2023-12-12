import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/utils/supabase/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const ExcludesForm = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: allProfiles } = await supabase.from("profiles").select();

  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user?.id);

  const profile: Profile = profiles ? profiles[0] : null;

  const updateExcludes = async (formData: FormData) => {
    "use server";

    const uuid = formData.get("name") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("profiles")
      .update({
        exclude: profile?.exclude ? [...profile.exclude, uuid] : [uuid],
      })
      .eq("user_id", user?.id);

    if (error) {
      return redirect("/?message=Could not update user");
    }

    return revalidatePath("/");
  };
  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={updateExcludes}
    >
      <select
        id="name"
        name="name"
        className="mt-2 block w-full rounded-full border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        // defaultValue="Canada"
      >
        {allProfiles
          ?.filter((prof: Profile) => prof?.user_id !== profile?.user_id)
          .filter(
            (el: Profile) => !profile?.exclude?.find((id) => id === el?.user_id)
          )
          .map((prof) => {
            return (
              <option key={prof.user_id} value={prof.user_id}>
                {prof.user_name}
              </option>
            );
          })}
      </select>

      <button
        // formAction={updateExcludes}
        className="bg-green-700 hover:bg-green-800 transition-all rounded-full px-4 py-2 text-foreground mb-2 font-bold"
      >
        Add Name
      </button>
      {/* <button
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
        Sign Up
      </button> */}
      {/* {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )} */}
    </form>
  );
};

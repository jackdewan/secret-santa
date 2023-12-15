import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Profile } from "@/utils/supabase/types";

export default async function Navigation() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user?.id)
    .single();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 sm:gap-4">
      {/* <span>Hey, {profile.user_name}!</span> */}
      {/* <Link className="hover:text-red-300" href="/">
        Home
      </Link> */}
      <Link className="hover:text-red-500 py-1" href="/wish-list">
        Wish List
      </Link>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-full no-underline hover:bg-red-500/50">
          Logout
        </button>
      </form>
    </div>
  ) : null;
}

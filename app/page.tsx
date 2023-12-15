"use server";
import { redirect } from "next/navigation";
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/Navigation";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { Profile } from "@/utils/supabase/types";
import RemoveButton from "@/components/RemoveButton";
import { ExcludesForm } from "@/components/ExcludesForm";
import { MatchButton } from "@/components/MatchButton";
import { WishList } from "@/components/WishList";

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data: allProfiles } = await supabase.from("profiles").select();

  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user?.id)
    .single();

  let profile: Profile = data;

  const { data: match } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", profile?.match)
    .single();

  // console.log("exclude: ", profile.exclude);

  const excludeBtnText = profile?.exclude?.length
    ? "My Excluded Names:"
    : "Add names below to exclude them from your drawing:";

  return (
    <main className="container max-w-sm space-y-20">
      <div className="space-y-5">
        <h2 className="font-bold text-4xl py-10 font-pacifico tracking-widest text-green-400">
          Hello, {profile?.user_name}!
        </h2>

        <div>
          {profile?.match ? (
            <h3 className="">My Match: {match.user_name}</h3>
          ) : (
            <p>Click the button to draw a name!</p>
          )}
        </div>
        <MatchButton user={user} match={match} />
      </div>

      <div className="space-y-5">
        {match ? (
          <div>
            <h2 className="py-10 text-xl">{match.user_name}'s Wish List:</h2>
            <WishList id={match?.user_id} />
          </div>
        ) : null}

        <h3>{excludeBtnText}</h3>

        <ExcludesForm />

        {profile?.exclude?.length ? (
          <ul className="">
            {profile?.exclude.map((id: string) => {
              const prof: Profile = allProfiles?.find(
                (el: Profile) => el?.user_id === id
              );
              return (
                <li
                  key={id}
                  className="flex justify-between items-center bg-black/30 rounded-full px-4 py-2"
                >
                  <span>{prof?.user_name}</span>
                  <RemoveButton val={id} col="exclude" />
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </main>
  );
}

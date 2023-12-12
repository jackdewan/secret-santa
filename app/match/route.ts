import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Profile } from "@/utils/supabase/types";

export async function PUT(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const { id } = await request.json();
  // const requestUrl = new URL(request.url)
  // const code = requestUrl.searchParams.get('code')

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (session) {
  //   await supabase.auth.signOut();
  // }
  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", id)
    .single();
  const profile: Profile = profileData;

  const { data: allProfiles } = await supabase.from("profiles").select();

  const alreadyMatched = allProfiles
    ?.filter((el: Profile) => el?.match)
    .map((el: Profile) => el?.match);

  // ?.filter((el: Profile) => !el?.exclude?.includes(id))

  const canMatch = allProfiles
    ?.filter((el: Profile) => el?.user_id !== id)
    .filter((el: Profile) => !alreadyMatched?.includes(el?.user_id))
    .filter((el: Profile) => !profile?.exclude?.includes(el?.user_id!))
    .map((el) => el.user_id);

  console.log("ecluded: ", profile?.exclude);
  console.log("matched already: ", alreadyMatched);
  console.log("can match: ", canMatch);

  // const matchArr = allProfiles
  //   ?.map((el) => el.user_id)
  // let matchArr;
  // if (notExcluded) {
  //   matchArr = notExcluded
  //     .map((el) => el.user_id)
  //     .filter((el) => el !== id)
  //     .filter((el) => !profile.exclude?.includes(id))
  //     .filter((el) => !alreadyMatched?.includes(id));
  // }

  // if it is excluded in profile, remove option

  let match;
  if (canMatch) {
    const n = Math.floor(Math.random() * canMatch.length);
    match = canMatch[n];
  }

  const { error } = await supabase
    .from("profiles")
    .update({ match })
    .eq("user_id", id);

  // // const matchArr = allProfiles?.map((prof: Profile) => prof.user_id !== id);
  if (error) {
    console.log(error);
  }

  // console.log(matchArr);
  // if (code) {
  // }

  // URL to redirect to after sign in process completes
  return NextResponse.json(profile);
}

// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { type NextRequest, NextResponse } from "next/server";

// export async function NA(req: NextRequest) {
//   const cookieStore = cookies();
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

//   // Check if we have a session

//   return NextResponse.redirect(new URL("/", req.url), {
//     status: 302,
//   });
// }

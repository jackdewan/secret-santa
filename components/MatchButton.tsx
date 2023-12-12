"use client";

import { Profile } from "@/utils/supabase/types";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// import { createClient } from "@/utils/supabase/server";
// import { Profile } from "@/utils/supabase/types";
// import { User } from "@supabase/supabase-js";
// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export const MatchButton = ({
  user,
  match,
}: {
  user: User;
  match: Profile;
}) => {
  const router = useRouter();
  const findMatch = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/match`, {
      method: "put",
      body: JSON.stringify({ id: user.id }),
    });

    router.refresh();
  };

  const isMatch = match ? true : false;

  if (isMatch) return null;

  return (
    <button
      // formAction={findMatch}
      onClick={findMatch}
      className={`bg-red-600 hover:bg-red-600/90 active:bg-red-600/80 rounded-full py-2.5 text-md w-full `}
      // disabled={isMatch}
    >
      Match Me!
    </button>
  );
};

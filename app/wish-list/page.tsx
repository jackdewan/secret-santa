import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { WishList } from "@/components/WishList";
import { WishListForm } from "@/components/WishListForm";
import { BackButton } from "@/components/BackButton";

export default async function WishListPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  return (
    <div className="container">
      <BackButton />
      <div className="container sm:max-w-lg">
        <h1 className="mb-10 text-2xl">My Wish List</h1>
        <WishListForm />
        <WishList id={user.id} />
      </div>
    </div>
  );
}

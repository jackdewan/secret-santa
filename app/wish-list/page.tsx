import RemoveButton from "@/components/RemoveButton";
import { WishList } from "@/components/WishList";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/utils/supabase/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WishListPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data: userProfile } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user.id)
    .single();
  const profile: Profile = userProfile;

  const addLink = async (formData: FormData) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const href = formData.get("href") as string;

    const ogs = require("open-graph-scraper");
    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
    const options = {
      url: href,
      fetchOptions: { headers: { "user-agent": userAgent } },
    };
    const ogsData = await ogs(options);

    const { error: ogsErr, html, result, response } = ogsData;

    console.log("error:", ogsErr); // This returns true or false. True if there was an error. The error itself is inside the result object.
    console.log("result:", result); // This contains all of the Open Graph results

    const { data, error } = await supabase
      .from("links")
      .insert({ href: result.ogUrl, title: result.ogTitle, user_id: user.id });

    if (error) {
      console.log("error: ", error);
    }

    console.log("data", data);

    return revalidatePath("/");
  };

  return (
    <div className="container ">
      <div className="my-10 inline-block">
        <Link href="/" className="flex items-center group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-4 h-4 mr-1 group-hover:-translate-x-1 transition-all`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="container sm:max-w-lg">
        <h1 className="mb-10 text-2xl">My Wish List</h1>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={addLink}
        >
          <input
            className="rounded-md px-4 py-2 bg-black/30 border mb-6"
            name="href"
            type="text"
            placeholder="https://www.example.com"
            required
          />

          <button className="bg-green-700 rounded-full px-4 py-2 text-foreground mb-2 font-bold">
            Add Link
          </button>

          {/* {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )} */}
        </form>
        <WishList id={user.id} />
      </div>
    </div>
  );
}

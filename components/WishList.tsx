import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const WishList = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: links } = await supabase
    .from("links")
    .select()
    .eq("user_id", id);

  const deleteLink = async (formData: FormData) => {
    "use server";

    const linkId = formData.get("linkId") as string;
    console.log(linkId);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("links")
      .delete()
      .eq("id", linkId);

    if (error) {
      console.log(error);
    }

    console.log(data);

    return revalidatePath("/");
  };

  return (
    <ul className="space-y-2">
      {links?.map((link, i) => {
        // console.log(link);
        return (
          <li
            key={link.id}
            className="flex items-center justify-between p-4 bg-black/10 gap-5 rounded-lg"
          >
            <a
              href={link.href}
              target="_blank"
              className="hover:cursor-pointer hover:text-red-500 transition-colors duration-300 py-1"
            >
              <span className="text-clip overflow-hidden">{link.title}</span>
            </a>
            {user?.id === id ? (
              <form action={deleteLink}>
                <input
                  name="linkId"
                  value={link.id}
                  // disabled
                  className="hidden"
                  readOnly
                  // aria-hidden
                />
                <button className="bg-black/20 hover:bg-black/40 h-full py-2 px-3 rounded-full">
                  Delete
                </button>
              </form>
            ) : null}
            {/* <RemoveButton col="wish_list" val={wish} /> */}
          </li>
        );
      })}
    </ul>
  );
};

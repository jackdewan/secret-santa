"use client";
import { useRef } from "react";
import { addLink } from "@/app/actions/actions";
import { SubmitButton } from "./SubmitButton";

export const WishListForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={async (formData) => {
        await addLink(formData);
        ref.current?.reset();
      }}
    >
      <input
        className="rounded-full px-4 py-2 bg-black/30 mb-6 border-gray-300/50 border"
        name="href"
        type="text"
        placeholder="https://www.example.com or Product Name"
        required
      />

      <SubmitButton className="bg-green-700 rounded-full px-4 py-2 text-foreground mb-2 font-bold">
        Add Item
      </SubmitButton>

      {/* {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )} */}
    </form>
  );
};

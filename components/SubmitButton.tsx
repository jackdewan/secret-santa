"use client";

// import { useFormStatus } from "react-dom";

export function SubmitButton({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  // const { pending } = useFormStatus();

  return (
    <button type="submit" className={className}>
      {children}
    </button>
  );
}

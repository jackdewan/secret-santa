import Link from "next/link";

export const BackButton = () => {
  return (
    <Link href="/" className="flex items-center group relative my-10">
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
  );
};

import Link from "next/link";
import Navigation from "./Navigation";
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Santa from "./Santa";

export default function Header() {
  return (
    <header className="container">
      <nav className="py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center text-red-500 gap-4">
          <Santa />
          <h2 className="font-pacifico tracking-widest text-lg md:text-2xl flex flex-col sm:flex-row sm:gap-2">
            <span>Secret</span> <span>Santa</span>
          </h2>
        </Link>
        <Navigation />
      </nav>
    </header>
  );
}

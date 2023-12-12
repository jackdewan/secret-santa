import Link from "next/link";
import Navigation from "./Navigation";
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Santa from "./Santa";

export default function Header() {
  return (
    <header className="container">
      <nav className="py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center text-red-500">
          <Santa />
          <h2 className="font-pacifico tracking-widest text-2xl">
            Secret Santa
          </h2>
        </Link>
        <Navigation />
      </nav>
    </header>
  );
}

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Secret Santa",
  // description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pacifico.variable}`}>
      <body className="bg-background text-foreground bg-green-950 text-white min-h-screen ">
        <Header />
        <main className="w-full pb-32 min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

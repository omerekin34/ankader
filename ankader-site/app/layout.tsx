import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { Great_Vibes, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
});

const script = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "ANKADER — Küllerinden Doğuyor",
  description:
    "ANKADER, dayanışmayla büyüyen gençlerin sesini yükselten bir sivil toplum kuruluşudur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${jakarta.variable} ${serif.variable} ${script.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ankader-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-secondary">
        <ScrollReveal />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}

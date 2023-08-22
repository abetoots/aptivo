import { ToastContainer } from "react-toastify";

//Misc
import "./globals.css";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

//Types
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";

const fontSans = Rubik({ subsets: ["latin"], variable: "--font-sans" });

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

//https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "Marketing Automation"],
  creator: "Aptivo",
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ToastContainer
          autoClose={false}
          hideProgressBar={true}
          draggable={false}
          closeButton={false}
        />
        {children}
      </body>
    </html>
  );
}

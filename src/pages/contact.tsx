//Components
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/header";
import UnderConstructionSvg from "@/assets/under-construction.svg";

//Misc
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ContactUs = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Aptivo is a suite of tools and services to help you grow your business. We help you automate and accelerate your business wealth and growth. Contact us for any inquiries you may have."
        />
      </Head>
      <Header className="z-10">
        <div className="ml-auto ">
          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "accent" }))}
            >
              Login
            </Link>
          </nav>
        </div>
      </Header>
      <main className="flex items-center p-6">
        <div className="mr-10">
          <h1 className="text-4xl font-bold">
            This page is
            <br />
            <span className="text-[3rem] font-extrabold uppercase">
              under construction
            </span>
          </h1>
        </div>
        <div className="mx-auto w-1/2">
          <UnderConstructionSvg />
        </div>
      </main>
    </>
  );
};

export default ContactUs;

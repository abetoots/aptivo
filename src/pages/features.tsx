import Head from "next/head";
import Link from "next/link";
import { buttonVariants } from "~/components/Button";
import Header from "~/components/Header";
import { cn } from "~/lib/utils";
import UnderConstructionSvg from "~/assets/under-construction.svg";

const Features = () => {
  return (
    <>
      <Head>
        <title>Aptivo Features</title>
        <meta
          name="description"
          content="Aptivo is a digital marketing automation platform that helps you create and manage your digital marketing campaigns."
        />
      </Head>
      <Header className="z-10">
        <div className="ml-auto ">
          <nav className="flex items-center gap-6">
            <Link href="/features">Features</Link>
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

export default Features;

import Head from "next/head";
import Link from "next/link";
import { buttonVariants } from "~/components/Button";
import Header from "~/components/Header";
import { cn } from "~/lib/utils";
import HandDrawMailSvg from "~/assets/handdrawn-mail.svg";
import PaydaySvg from "~/assets/payday.svg";
import HandDrawnAccountingSvg from "~/assets/handdrawn-accounting.svg";
import HandDrawnAssistantSvg from "~/assets/handdrawn-assistant.svg";
import HandDrawnGraphicDesignSvg from "~/assets/handdrawn-graphic-design.svg";
import HandDrawnWebDesignSvg from "~/assets/handdrawn-web-design.svg";
import React from "react";

const Learn = () => {
  return (
    <>
      <Head>
        <title>Aptivo | Learn How To Grow Your Business </title>
        <meta
          name="description"
          content="Aptivo is everything you need to grow your business. We help you automate and accelerate your business wealth and growth."
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
      <main className="mt-24 px-6">
        <section className="mb-24 text-center">
          <h1 className="mb-6 text-3xl font-extrabold">
            Building wealth for business owners
          </h1>
          <p className="text-sm leading-loose">
            Aptivo is everything you need to build wealth as an entrepreneur,
            freelancer, consultant, or independent business owner. We serve
            entrepreneurs with the tools, services, and network to transform
            their business and unlock opportunities.
          </p>
        </section>
        <section className="mb-24">
          <h2 className="mb-3 text-xl font-bold">Explore Our Products</h2>
          <h3 className="mb-6 text-lg font-semibold">
            Use our products and tools to accelerate your business.
          </h3>
          <div className="flexrow flex grid-cols-2 flex-col justify-center gap-10 md:grid lg:grid-cols-4">
            <Card
              renderImg={() => (
                <div className="mx-auto mb-6 w-1/2">
                  <HandDrawMailSvg />
                </div>
              )}
              title="NextSend"
              description="Automate sending of targeted emails. Turn your signups into profitable customer relationships."
              renderAfter={() => (
                <div className="mb-6 w-fit rounded-full bg-accent-1 px-4 py-1 text-xs text-secondary">
                  Launching Q3 2023
                </div>
              )}
            />
            <Card
              renderImg={() => (
                <div className="mx-auto mb-6 ">
                  <PaydaySvg />
                </div>
              )}
              title="UpPay"
              description="Handle payroll and all things compliance for your global
                  employees. Localized contracts and documents, payslip creation and
                  delivery, salary and tax payments, and employee benefits, all
                  in one place."
              renderAfter={() => (
                <div className="mb-6 w-fit rounded-full bg-accent-1 px-4 py-1 text-xs text-secondary">
                  Launching Q4 2023
                </div>
              )}
            />
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold">Explore Our Services</h2>
          <h3 className="mb-6 text-lg font-semibold">
            Work with our team to handle your business needs.
          </h3>
          <div className="flexrow flex grid-cols-2 flex-col items-center justify-center gap-10 md:grid lg:grid-cols-4">
            <Card
              renderImg={() => (
                <div className="mx-auto mb-6 w-1/2">
                  <HandDrawnAccountingSvg />
                </div>
              )}
              title="Accounting and Finance"
            />
            <Card
              renderImg={() => (
                <div className="mx-auto mb-6 w-1/2">
                  <HandDrawnAssistantSvg />
                </div>
              )}
              title="Admin Work"
            />
            <Card
              renderImg={() => (
                <div className="mx-auto mb-6 w-1/2">
                  <HandDrawnGraphicDesignSvg />
                </div>
              )}
              title="Graphic Design"
            />
            <Card
              renderImg={() => (
                <div className="mx-auto mb-6 w-1/2">
                  <HandDrawnWebDesignSvg />
                </div>
              )}
              title="Web Design"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Learn;

type CardProps = {
  renderImg?: () => React.ReactNode;
  title: string;
  description?: string;
  renderAfter?: () => React.ReactNode;
};

const Card = ({ renderImg, title, description, renderAfter }: CardProps) => {
  return (
    <div className="relative border p-6 shadow-md">
      {renderImg?.()}
      <div className="relative z-[2]">
        <h3 className="mb-3 text-lg font-semibold text-secondary">{title}</h3>
        {description ? (
          <p className="mb-6 leading-loose">{description}</p>
        ) : null}
        {renderAfter?.()}
      </div>
    </div>
  );
};

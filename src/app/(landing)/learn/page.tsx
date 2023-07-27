//Components
import Link from "next/link";
import HandDrawMailSvg from "@/assets/handdrawn-mail.svg";
import PaydaySvg from "@/assets/payday.svg";
import HandDrawnAccountingSvg from "@/assets/handdrawn-accounting.svg";
import HandDrawnAssistantSvg from "@/assets/handdrawn-assistant.svg";
import HandDrawnGraphicDesignSvg from "@/assets/handdrawn-graphic-design.svg";
import HandDrawnWebDesignSvg from "@/assets/handdrawn-web-design.svg";
import HandDrawnColdCalllingSvg from "@/assets/handdrawn-cold-calling.svg";
import HandDrawnCustomerSupportSvg from "@/assets/handdrawn-customer-support.svg";
import HandDrawnLeadGenerationSvg from "@/assets/handdrawn-lead-generation.svg";
import HandDrawnSocialMediaMarketingSvg from "@/assets/handdrawn-social-media-marketing.svg";

//Misc
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="mt-24 p-6">
      <section className="mb-24 text-center">
        <h1 className="mb-6 text-3xl font-extrabold md:text-6xl">
          Building wealth for business owners
        </h1>
        <p className="text-sm leading-loose md:text-xl">
          Aptivo is everything you need to build wealth as an entrepreneur,
          freelancer, consultant, or independent business owner. We serve
          entrepreneurs with the tools, services, and network to transform their
          business and unlock opportunities.
        </p>
      </section>
      <section className="mb-24">
        <h2 className="mb-3 text-xl font-bold md:text-3xl">
          Explore Our Products
        </h2>
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
              <div className="bg-accent-1 mb-6 w-fit rounded-full px-4 py-1 text-xs text-secondary">
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
              <div className="bg-accent-1 mb-6 w-fit rounded-full px-4 py-1 text-xs text-secondary">
                Launching Q4 2023
              </div>
            )}
          />
          <Card
            title="Have a specific tool in mind?"
            description="Let us know what you need."
            renderAfter={() => (
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Contact Us
              </Link>
            )}
          />
        </div>
      </section>
      <section className="mb-24">
        <h2 className="mb-3 text-xl font-bold md:text-3xl">
          Explore Our Services
        </h2>
        <h3 className="mb-6 text-lg font-semibold">
          Work with our team to handle your business needs.
        </h3>
        <div className="flexrow flex grid-cols-2 flex-col justify-center gap-10 md:grid lg:grid-cols-4">
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
                <HandDrawnColdCalllingSvg />
              </div>
            )}
            title="Cold Calling"
          />
          <Card
            renderImg={() => (
              <div className="mx-auto mb-6 w-1/2">
                <HandDrawnCustomerSupportSvg />
              </div>
            )}
            title="Customer Support"
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
                <HandDrawnLeadGenerationSvg />
              </div>
            )}
            title="Lead Generation"
          />
          <Card
            renderImg={() => (
              <div className="mx-auto mb-6 w-1/2">
                <HandDrawnSocialMediaMarketingSvg />
              </div>
            )}
            title="Social Media Marketing"
          />
          <Card
            renderImg={() => (
              <div className="mx-auto mb-6 w-1/2">
                <HandDrawnWebDesignSvg />
              </div>
            )}
            title="Web Design"
          />
          <Card
            title="Need a specific service?"
            description="Let us know what you need."
            renderAfter={() => (
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Contact Us
              </Link>
            )}
          />
        </div>
      </section>
    </main>
  );
}

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

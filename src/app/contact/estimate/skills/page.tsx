"use client";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log("data", Object.fromEntries(data));
    // localStorage.setItem("skills", JSON.stringify(Object.fromEntries(data)));
    router.push("/contact/estimate/details");
  };

  return (
    <section className="h-full p-10">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="mb-10 font-heading text-5xl">
          What skills should specialists have when creating your project?
        </h1>
        <div className="mb-10">
          <div className="flex gap-6">
            <CheckboxCard
              id="webDevelopment"
              heading="Web Development"
              description="Design, code, and implement the front-end/back-end/full-stack of your web application."
              icon={<Icons.webdev className="h-10 w-10 text-sky-500" />}
              focusClassName="bg-sky-200"
              checkboxFocusClassName="bg-sky-500"
            />
            <CheckboxCard
              id="branding"
              heading="Branding"
              description="Help build your brand identity and create a logo, color palette, typography, and more."
              icon={<Icons.branding className="h-10 w-10 text-orange-500" />}
              focusClassName="bg-orange-200"
              checkboxFocusClassName="bg-orange-500"
            />
            <CheckboxCard
              id="virtualAssistant"
              heading="Virtual Assistant"
              description="Help you with administrative tasks, scheduling, and more."
              icon={
                <Icons.virtualassistant className="h-10 w-10 text-green-500" />
              }
              focusClassName="bg-green-200"
              checkboxFocusClassName="bg-green-500"
            />
            <CheckboxCard
              id="contentCreation"
              heading="Content Creation"
              description="Create content for your website, blog, social media, and more."
              icon={
                <Icons.contentcreation className="h-10 w-10 text-purple-500" />
              }
              focusClassName="bg-purple-200"
              checkboxFocusClassName="bg-purple-500"
            />
          </div>
        </div>
        <div className="mb-10 flex items-center divide-x-2">
          <div className="pr-3">
            <Icons.info className="h-6 w-6 text-gray-500" />
          </div>
          <div className="pl-3">
            <p>
              Can&apos;t find what you&apos;re looking for? Or not sure which
              specialists to choose? <br />
              It&apos;s okay, move on to the next step and we&apos;ll do the
              rest.
            </p>
          </div>
        </div>
        <div>
          <Link
            href="/contact/estimate/personal"
            className={cn(buttonVariants({ variant: "plain" }), "mr-3")}
          >
            Back ←
          </Link>
          <Button variant="secondary" type="submit">
            Next →
          </Button>
        </div>
      </form>
    </section>
  );
}

const CheckboxCard = ({
  id,
  heading,
  description,
  icon,
  rootclassName,
  checkboxClassName,
  focusClassName,
  checkboxFocusClassName,
}: {
  id: string;
  heading: string;
  description: string;
  icon: React.ReactNode;
  rootclassName?: string;
  checkboxClassName?: string;
  focusClassName?: string;
  checkboxFocusClassName?: string;
}) => {
  const [checked, setChecked] =
    useState<Checkbox.CheckedState>("indeterminate");

  return (
    <label
      htmlFor={id}
      className={cn(
        "checked relative block w-52 cursor-pointer rounded-sm border p-4",
        rootclassName,
        checked === true && focusClassName
      )}
    >
      <div className="mb-3 flex justify-between">
        {icon}
        <Checkbox.Root
          id={id}
          className={cn(
            "top-0 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-md border border-accent",
            checkboxClassName,
            checked === true && checkboxFocusClassName
          )}
          checked={checked}
          name={id}
          onCheckedChange={setChecked}
        >
          <Checkbox.Indicator>
            {checked === true && <Icons.check className="h-5 w-5 " />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <h2 className="mb-6 font-heading text-lg">{heading}</h2>
      <p className="text-sm">{description}</p>
    </label>
  );
};

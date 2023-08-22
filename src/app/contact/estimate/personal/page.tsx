"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    // localStorage.setItem("personal", JSON.stringify(Object.fromEntries(data)));
    router.push("/contact/estimate/skills");
  };

  return (
    <section className="h-full p-10">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-10">
          <h1 className="mb-10 font-heading text-5xl">
            Before we start, we&apos;d like to know a little more about you.
          </h1>
          <div className="w-[75%]">
            <div className="mb-6">
              <label htmlFor="name">
                Your Name <span className="text-red-600">*</span>{" "}
              </label>
              <Input type="text" id="name" name="name" required />
            </div>

            <div className="mb-6 flex w-full gap-6">
              <div className="flex-1">
                <label htmlFor="location">Your Location</label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Where are you from? (optional)"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="email">
                  Your Email <span className="text-red-600">*</span>{" "}
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@yourcompany.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="productOrCompany">
                Product or Company <span className="text-red-600">*</span>{" "}
              </label>
              <Input
                type="text"
                id="productOrCompany"
                name="productOrCompany"
                placeholder="What is the name of your product or company?"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="industry">
                Industry <span className="text-red-600">*</span>{" "}
              </label>
              <Input
                type="text"
                id="industry"
                name="industry"
                required
                placeholder="What industry do you operate in?"
              />
            </div>
          </div>
        </div>
        <div>
          <Link
            href="/contact"
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

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className="h-full p-10">
      <h1 className="mb-6 font-heading text-5xl">
        Challenge us together. <br />
        Get estimate.
      </h1>
      <h2 className="mb-6 text-2xl">
        In three short steps we will establish the most important details of our
        joint journey.
      </h2>

      <div className="mb-6 flex items-center gap-3">
        <Icons.one className="h-5 w-5" color="green" />
        <p>Your personal data</p>
      </div>
      <div className="mb-6 flex items-center gap-3">
        <Icons.two className="h-5 w-5" color="green" />
        <p>Determine the skills you need</p>
      </div>
      <div className="mb-6 flex items-center gap-3">
        <Icons.three className="h-5 w-5" color="green" />
        <p>Details about the project</p>
      </div>
      <Link
        href="/contact/estimate/personal"
        className={buttonVariants({ variant: "secondary" })}
      >
        Start estimation →
      </Link>
    </section>
  );
}

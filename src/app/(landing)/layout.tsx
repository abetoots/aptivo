import Header from "@/components/header";
import Link from "next/link";

//Misc
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header className="z-10">
        <div className="ml-auto ">
          <nav className="flex items-center gap-6">
            <Link href="/contact">Contact Us</Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "accent" }))}
            >
              Login
            </Link>
          </nav>
        </div>
      </Header>
      {children}
    </>
  );
};

export default LandingLayout;

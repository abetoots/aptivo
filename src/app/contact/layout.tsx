import Link from "next/link";
import Logo from "@/components/logo";

//Misc
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[30%_1fr]">
      <section className="p-6">
        <div className="md:mb-20">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="mb-12 flex">
          <div className="mr-4 ">
            <Icons.chat className="h-10 w-10 rounded-md border border-gray-300 p-2" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-heading text-xl">
              <Link href="/contact">Have an inquiry?</Link>
            </h3>
            <p>
              You can reach our team anytime via: <br />{" "}
              <strong>
                <a href="mailto:support@aptivo.io">support@aptivo.io</a>
              </strong>
            </p>
          </div>
        </div>
        <div className="mb-12 flex">
          <div className="mr-4 ">
            <Icons.call className="h-10 w-10 rounded-md border border-gray-300 p-2" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-heading text-xl">Phone</h3>
            <p>
              Mon-Fri from 8am to 5pm. <br /> <strong>+639062549734</strong>
            </p>
          </div>
        </div>
        <div className="mb-12 flex">
          <div className="mr-4 ">
            <Icons.calculator className="h-10 w-10 rounded-md border border-gray-300 p-2" />
          </div>
          <div className="flex flex-col justify-center">
            <Link className={buttonVariants()} href="/contact/estimate">
              <h3 className="font-heading text-lg">Get an estimate</h3>
            </Link>
          </div>
        </div>
      </section>

      <main>{children}</main>
    </div>
  );
};

export default ContactLayout;

//Components
import Link from "next/link";
import { UserAuthForm } from "~/components/UserAuthForm";
import Logo from "~/components/Logo";
import { Icons } from "~/components/Icons";
import Head from "next/head";

//Misc
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/Button";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to your account." />
      </Head>
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center p-6">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Logo className="w-2/6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email to sign in to your account
            </p>
          </div>
          <UserAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            <Link href="/register" className="underline underline-offset-4">
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

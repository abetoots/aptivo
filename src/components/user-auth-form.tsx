//Components
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { notifySuccess } from "@/components/notifications";

//Misc
import * as React from "react";
// import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";

//Types
import type * as z from "zod";

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isLinkedInLoading, setIsLinkedInLoading] = React.useState(false);
  //   const searchParams = useSearchParams();

  function onSubmit(data: FormData) {
    setIsLoading(true);

    // const signInResult = await signIn("email", {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get("from") || "/profile",
    // });

    notifySuccess();

    setIsLoading(false);

    // if (!signInResult?.ok) {
    //   notifyError(
    //     "Something went wrong.",
    //     "Your sign in request failed. Please try again."
    //   );
    //   return;
    // }

    // return toast({
    //   title: "Check your email",
    //   description: "We sent you a login link. Be sure to check your spam too.",
    // });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name~example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          //   void signIn("google", {
          //     redirect: false,
          //     callbackUrl: searchParams?.get("from") || "/profile",
          //   });
          notifySuccess("Logged in to Google!");
          setIsGoogleLoading(false);
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsLinkedInLoading(true);
          //   void signIn("linkedin", {
          //     redirect: false,
          //     callbackUrl: searchParams?.get("from") || "/profile",
          //   });
          notifySuccess("Logged in to LinkedIn!");
          setIsLinkedInLoading(false);
        }}
        disabled={isLoading || isLinkedInLoading}
      >
        {isLinkedInLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.linkedin className="mr-2 h-4 w-4" />
        )}{" "}
        LinkedIn
      </button>
    </div>
  );
}

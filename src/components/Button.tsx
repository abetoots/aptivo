//Misc
import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

//Types
import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90",
        "default-white":
          "bg-white border border-[.2rem] border-primary hover:bg-primary",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary hover:bg-secondary/80",
        "secondary-white":
          "bg-white border-[.2rem] border-secondary hover:bg-secondary",
        accent: "bg-accent-1 hover:bg-accent-1/90",
        ghost: "hover:bg-accent-1 hover:text-accent-1-foreground",
      },
      size: {
        default: "h-10 py-3 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md py-4",
        auto: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.PropsWithChildren<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> &
    VariantProps<typeof buttonVariants>
>;
export type Ref = HTMLButtonElement;

//Custom button that always behaves as type:'button' since buttons behave as type="submit" inside a form if type is missing
const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const { variant, size, ...rest } = props;

  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }))}
      {...rest}
    >
      {props.children}
    </button>
  );
});
Button.displayName = "Button";

export default Button;

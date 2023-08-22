import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const TextAreaLine = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, type, ...props }, ref) => {
  return (
    <div className="group relative">
      <div>
        <textarea
          className={cn(
            "flex h-32 w-full bg-transparent px-3 py-2 text-sm leading-[1px] ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      <div
        className={cn(
          "absolute bottom-0 h-[1px] w-full bg-black transition-all duration-300 ease-in-out ",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-secondary after:transition-all after:duration-300 after:ease-in-out after:group-hover:scale-x-100"
        )}
      ></div>
    </div>
  );
});
TextAreaLine.displayName = "TextAreaLine";

export { Textarea, TextAreaLine };

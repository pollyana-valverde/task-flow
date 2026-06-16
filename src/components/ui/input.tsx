import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 rounded-lg border bg-transparent px-4 py-2.5 text-base transition-[color] outline-none  placeholder:text-lime-950/70 focus-visible:ring-3",
  {
    variants: {
      variant: {
        default:
          "border-lime-950  focus-visible:ring-lime-500/50  dark:bg-input/30 dark:border-lime-950/50 dark:focus-visible:ring-lime-500/20",
        destructive:
          "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40",
        file: "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        disable:
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input };

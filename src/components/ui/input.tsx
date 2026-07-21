import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

const inputVariants = cva(
  "w-full min-w-0 rounded-[0.75rem] border bg-transparent px-4 py-3 text-base transition-[color] outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
  {
    variants: {
      variant: {
        default:
          "border-muted focus-visible:ring-secondary focus-visible:border-2 focus-visible:border-primary",
        destructive: "border-2 border-destructive ring-3 ring-destructive/20",
        file: "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
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

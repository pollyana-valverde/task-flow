import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `group/button inline-flex shrink-0 items-center justify-center
  rounded-lg border border-transparent bg-clip-padding font-semibold whitespace-nowrap text-base
  transition-all outline-none select-none cursor-pointer
  focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px
  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
  [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default:
          "bg-primary border-2 border-lime-950 text-lime-950 shadow-[3px_3px_0] focus-visible:ring-primary/30 active:shadow-none dark:border-lime-700 dark:shadow-lime-700",
        outline:
          "border-muted bg-card focus-visible:ring-secondary/30 hover:bg-muted/40",
        secondary:
          "border-2 border-lime-950 text-foreground shadow-[3px_3px_0] focus-visible:ring-primary/20 active:shadow-none hover:bg-muted/50 dark:border-lime-700 dark:shadow-lime-700",
        ghost: "text-foreground/70 hover:bg-muted/50 hover:text-foreground",
        destructive:
          "text-white bg-destructive border-2 border-red-950 shadow-[3px_3px_0] shadow-red-950",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "gap-1.5 py-2.5 px-5.5 rounded-[0.75rem]",
        lg: "gap-1 py-3.5 px-7.5 rounded-[0.875rem]",
        sm: "gap-1 py-2 px-4 rounded-[0.625rem]",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

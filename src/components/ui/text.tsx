import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-base leading-[140%] font-normal text-muted-foreground",
      display: "text-5xl font-bold font-heading",
      h1: "text-3xl leading-[140%] font-bold font-heading",
      h2: "text-xl leading-[140%] font-semibold font-heading",
      h3: "text-lg leading-[140%] font-semibold font-heading",
      sm: "text-sm leading-[140%] font-normal text-muted-foreground/75",
      mono: "text-xs leading-[140%] text-muted-foreground/75 font-normal font-mono",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

function Text({
  children,
  as = "span",
  className,
  variant,
  ...rest
}: TextProps) {
  return React.createElement(
    as,
    { className: cn(textVariants({ variant }), className), ...rest },
    children,
  );
}

export { Text, textVariants };

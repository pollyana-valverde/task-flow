import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-base leading-[140%] font-normal font-sans",
      display: "text-4xl leading-[140%] font-extrabold font-sans",
      "heading-1": "text-2xl leading-[140%] font-extrabold font-sans",
      "heading-2": "text-xl leading-[140%] font-bold font-sans",
      "heading-3": "text-lg leading-[140%] font-bold font-sans",
      content: "text-sm leading-[140%] font-normal font-sans",
      caption: "text-xs leading-[140%] font-normal font-sans",
      label: "text-[.625rem] leading-[140%] font-bold uppercase font-mono",
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

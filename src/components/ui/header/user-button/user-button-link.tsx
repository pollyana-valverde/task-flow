import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { Text } from "@/components/ui/text";

const bodyVariants = cva("flex items-center gap-2 px-3 py-2 rounded-md", {
  variants: {
    variant: {
      default: "hover:bg-lime-950/5",
      destructive: "hover:bg-destructive/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva("w-4 h-4", {
  variants: {
    variant: {
      default: "text-lime-950/80",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const labelVariants = cva("", {
  variants: {
    variant: {
      default: "text-lime-950",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface UserButtonLinkProps
  extends
    React.ComponentProps<"a">,
    VariantProps<typeof bodyVariants>,
    VariantProps<typeof iconVariants>,
    VariantProps<typeof labelVariants> {
  path: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

function UserButtonLink({
  path,
  label,
  Icon,
  variant,
  className,
  ...props
}: UserButtonLinkProps) {
  return (
    <Link
      href={path}
      className={cn(bodyVariants({ variant }), className)}
      {...props}
    >
      <Icon className={cn(iconVariants({ variant }))} />
      <Text variant="content" className={cn(labelVariants({ variant }))}>
        {label}
      </Text>
    </Link>
  );
}

export { UserButtonLink };

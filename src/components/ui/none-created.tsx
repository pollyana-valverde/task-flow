import { Text, TextProps } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Layers, LucideIcon } from "lucide-react";

interface NoneCreatedProps extends React.ComponentProps<"div"> {}

function NoneCreated({ className, children, ...props }: NoneCreatedProps) {
  return (
    <div
      className={cn(
        "w-full h-[80vh] flex flex-col justify-center items-center gap-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface NoneCreatedIconProps extends React.ComponentProps<"div"> {
  Icon: LucideIcon;
  iconClassname?: string;
}

function NoneCreatedIcon({
  className,
  Icon,
  iconClassname,
  ...props
}: NoneCreatedIconProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-secondary dark:bg-secondary/70 border-2 border-dashed border-primary rounded-2xl p-5.5",
        className,
      )}
    >
      <Icon className={cn("size-10 text-chart-3/80", iconClassname)} />
    </div>
  );
}

function NoneCreatedContent({
  className,
  children,
  ...props
}: NoneCreatedProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 items-center text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface NoneCreatedTextProps extends TextProps {}

function NoneCreatedTitle({
  className,
  children,
  ...props
}: NoneCreatedTextProps) {
  return (
    <Text variant="h1" className={className} {...props}>
      {children}
    </Text>
  );
}

function NoneCreatedSubtitle({
  className,
  children,
  ...props
}: NoneCreatedTextProps) {
  return (
    <Text
      className={cn("text-muted-foreground/75 max-w-sm", className)}
      {...props}
    >
      {children}
    </Text>
  );
}

interface NoneCreatedActionProps {
  children: React.ReactNode | React.ReactElement;
}

function NoneCreatedAction({ children }: NoneCreatedActionProps) {
  return <>{children}</>;
}

export {
  NoneCreated,
  NoneCreatedIcon,
  NoneCreatedContent,
  NoneCreatedTitle,
  NoneCreatedSubtitle,
  NoneCreatedAction,
};

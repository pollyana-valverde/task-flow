import { Text, type TextProps } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.ComponentProps<"div"> {}

function Header({ className, children, ...props }: HeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center md:flex-row justify-between gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function HeaderContent({ className, children, ...props }: HeaderProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {children}
    </div>
  );
}

interface HeaderTextProps extends TextProps {}

function HeaderTitle({ className, children, ...props }: HeaderTextProps) {
  return (
    <Text variant="h1" className={className} {...props}>
      {children}
    </Text>
  );
}

function HeaderSubtitle({ className, children, ...props }: HeaderTextProps) {
  return (
    <Text variant="mono" className={cn("text-sm", className)} {...props}>
      {children}
    </Text>
  );
}

interface HeaderActionProps {
  children: React.ReactNode | React.ReactElement;
}

function HeaderAction({ children }: HeaderActionProps) {
  return <>{children}</>;
}

export { Header, HeaderContent, HeaderTitle, HeaderSubtitle, HeaderAction };

import { Button } from "@/components/ui/button";

interface CoreButtonProps extends React.ComponentProps<typeof Button> {}

function CoreButton({ children, ...props }: CoreButtonProps) {
  return (
    <div
      className={`
        p-0.5 bg-lime-950
        border-b-3 border-r-3 border-lime-400 rounded-tl-lg rounded-xl
        hover:border-lime-950 group`}
    >
      <Button
        {...props}
        className={`
        bg-lime-400 w-full
        rounded-tl-md rounded-lg border-t-2 border-l-2 border-white text-lime-950
        group-hover:bg-lime-400 group-hover:border-none`}
      >
        {children}
      </Button>
    </div>
  );
}

export { CoreButton };

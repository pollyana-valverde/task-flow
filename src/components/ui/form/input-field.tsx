import type {
  FieldError as FieldErrorType,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFieldProps<
  T extends FieldValues,
> extends React.ComponentProps<"input"> {
  errorInput:
    | {
        message: string | undefined;
      }
    | FieldErrorType
    | undefined;
  register: UseFormRegister<T>;
  input: Path<T>;
  label?: string;
  placeholder: string;
  type?: string;
  children?: React.ReactNode;
}

function InputField<T extends FieldValues>({
  errorInput,
  input,
  label,
  placeholder,
  register,
  type = "text",
  children,
}: InputFieldProps<T>) {
  return (
    <Field
      className={cn(
        "flex flex-col gap-1",
        errorInput && "-mb-6",
        input === "password" && "mb-0",
      )}
    >
      {label ? (
        <FieldLabel
          htmlFor={input}
          className={cn(errorInput && "text-destructive")}
        >
          {label}
        </FieldLabel>
      ) : (
        children
      )}

      <Input
        id={input}
        variant={errorInput && "destructive"}
        placeholder={placeholder}
        type={type}
        required
        {...register(input)}
      />

      <FieldError
        errors={[{ message: errorInput?.message }]}
        className="text-end"
      >
        {errorInput?.message}
      </FieldError>
    </Field>
  );
}

export { InputField };

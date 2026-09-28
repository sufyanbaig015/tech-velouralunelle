import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ControlProps<Name extends string> = {
  id: string;
  name: Name;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type FormFieldProps<Name extends string> = {
  /** Prefix for the control's id, e.g. "contact" gives "contact-email". */
  idPrefix: string;
  name: Name;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (props: ControlProps<Name>) => ReactNode;
};

// Label, control and error message, wired together for screen readers.
export function FormField<Name extends string>({
  idPrefix,
  name,
  label,
  required = false,
  error,
  className,
  children,
}: FormFieldProps<Name>) {
  const id = `${idPrefix}-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-body"> (optional)</span>
        )}
      </Label>
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

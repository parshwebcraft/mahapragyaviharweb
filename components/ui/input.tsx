import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-border bg-white/80 px-4 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-accent/40",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

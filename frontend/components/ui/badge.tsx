import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium", className)}
      {...props}
    >
      {children}
    </div>
  );
});

Badge.displayName = "Badge";

export { Badge };

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-md hover:bg-primary-dark transition-all duration-200 active:shadow-sm",
        destructive:
          "bg-danger text-white shadow-md hover:bg-red-600 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40 active:shadow-sm",
        outline:
          "border border-slate-300 dark:border-slate-600 bg-background text-foreground shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
        secondary:
          "bg-secondary text-white shadow-md hover:bg-secondary-dark transition-all duration-200 active:shadow-sm",
        ghost:
          "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground transition-colors",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark transition-colors",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }

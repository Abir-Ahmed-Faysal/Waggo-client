import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-500 dark:placeholder:text-slate-400 selection:bg-primary selection:text-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-sm transition-[color,border-color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
        "aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger",
        className
      )}
      {...props} />
  );
}

export { Input }

import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-slate-300 dark:border-slate-600 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger dark:bg-slate-800 flex field-sizing-content min-h-20 w-full rounded-md border bg-white px-3 py-2 text-base shadow-sm transition-[color,border-color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Textarea }

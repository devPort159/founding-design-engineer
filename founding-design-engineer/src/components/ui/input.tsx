import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        {props.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-curo-font font-public-sans text-sm">{props.prefix}</span>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-Gray focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-curo-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            props.prefix && "pl-7",
            className
        )}
        ref={ref}
        {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

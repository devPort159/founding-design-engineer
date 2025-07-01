"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="relative h-4 w-4">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer absolute h-4 w-4 shrink-0 rounded-sm border border-White ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-Curo-Green text-Primary-Blue dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900 shadow-[0px_1px_2px_0px_rgba(164,164,185,0.30),0px_0px_0px_1px_#E2DED4] data-[state=checked]:shadow-[0px_1px_2px_0px_rgba(142,161,19,0.50),0px_0px_0px_1px_#CAEB47,0px_0px_36px_0px_rgba(225,254,141,0.10)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check size={16} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

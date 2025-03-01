"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useAnimation } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground",
        outline:
          "border border-input bg-background hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-11 rounded-md px-5",
        lg: "h-11 rounded-md px-5",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const buttonControls = useAnimation()
    const textControls = useAnimation()

    if (asChild) {
      const Comp = Slot;
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
      )
    }

    return (
      <motion.button
        onHoverStart={() => {
          buttonControls.start({ scale: 1.08, transition: { type: "spring", bounce: 0.65, duration: 0.625 } })
          textControls.start({ scale: 1 / 1.08, transition: { type: "spring", bounce: 0.65, duration: 0.625 } })
        }}
        onHoverEnd={() => {
          buttonControls.start({ scale: 1, transition: { type: "spring", bounce: 0.65, duration: 0.625 } })
          textControls.start({ scale: 1, transition: { type: "spring", bounce: 0.65, duration: 0.625 } })
        }}
        animate={buttonControls}
        style={{ willChange: "transform" }}
        className={cn(buttonVariants({ variant, size, className }), "origin-center", "overflow-hidden", "relative", "backface-visibility-hidden")}
        ref={ref}
        {...props}
      >
        <motion.span 
          animate={textControls} 
          style={{ willChange: "transform" }}
          className="origin-center flex items-center justify-center gap-2 whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          {props.children}
        </motion.span>
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

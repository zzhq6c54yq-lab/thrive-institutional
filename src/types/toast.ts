
import * as React from "react"

export interface ToasterToast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
    altText?: string
  }
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  duration?: number
}

export interface ToastActionProps {
  altText: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export type ToastProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-toast").Root> & {
  variant?: "default" | "destructive" | "success" | "warning" | "info"
}

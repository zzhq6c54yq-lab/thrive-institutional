
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { 
  type ToastProps, 
  type ToastActionProps,
} from "@/types/toast"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
        destructive:
          "destructive group border-red-200 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400",
        success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const getToastIcon = (variant: string) => {
  switch (variant) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 animate-in zoom-in-50 duration-300" />
    case 'destructive':
      return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 animate-in zoom-in-50 duration-300" />
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 animate-in zoom-in-50 duration-300" />
    case 'info':
      return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-in zoom-in-50 duration-300" />
    default:
      return null
  }
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, altText, children, onClick }, ref) => {
    return (
      <ToastPrimitives.Action
        ref={ref}
        altText={altText}
        className={cn(
          "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-white dark:bg-gray-800 px-3 text-sm font-medium text-gray-900 dark:text-gray-100 ring-offset-background transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={onClick}
      >
        {children}
      </ToastPrimitives.Action>
    );
  }
)
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-gray-500 dark:text-gray-400 opacity-0 transition-opacity hover:text-gray-900 dark:hover:text-gray-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className
    )}
    toast-close=""
    aria-label="Close notification"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold text-gray-900 dark:text-gray-100", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90 text-gray-700 dark:text-gray-300", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

const ToastContent: React.FC<{
  variant?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ variant = 'default', title, description, children }) => {
  const icon = getToastIcon(variant);
  
  return (
    <div className="flex items-start space-x-3">
      {icon && (
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
        {children}
      </div>
    </div>
  );
};

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastContent,
}

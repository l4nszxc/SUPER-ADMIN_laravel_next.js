import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined)

export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean
  children: React.ReactElement
}) {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("SheetTrigger must be used within Sheet")

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        context.setOpen(true)
        if (childProps.onClick) childProps.onClick(e)
      },
    } as any)
  }

  return (
    <button onClick={() => context.setOpen(true)}>
      {children}
    </button>
  )
}

export function SheetContent({
  children,
  side = "right",
  className,
}: {
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  className?: string
}) {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("SheetContent must be used within Sheet")

  const { open, setOpen } = context

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  const sideClasses = {
    left: "left-0 top-0 h-full max-w-full",
    right: "right-0 top-0 h-full max-w-full",
    top: "top-0 left-0 w-full max-h-[85vh]",
    bottom: "bottom-0 left-0 w-full max-h-[85vh]",
  }

  const animationClasses = {
    left: "animate-in slide-in-from-left",
    right: "animate-in slide-in-from-right",
    top: "animate-in slide-in-from-top",
    bottom: "animate-in slide-in-from-bottom",
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={() => setOpen(false)}
      />
      
      {/* Sheet */}
      <div
        className={cn(
          "fixed z-[65] bg-white dark:bg-gray-900 shadow-xl overflow-y-auto duration-300",
          sideClasses[side],
          animationClasses[side],
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export function SheetHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col space-y-2 p-6", className)}>
      {children}
    </div>
  )
}

export function SheetTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  )
}

export function SheetDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  )
}

export function SheetClose({
  children,
  asChild,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("SheetClose must be used within Sheet")

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any
    return React.cloneElement(children, {
      onClick: () => {
        context.setOpen(false)
        if (childProps.onClick) childProps.onClick()
      },
    } as any)
  }

  return (
    <button onClick={() => context.setOpen(false)}>
      {children}
    </button>
  )
}

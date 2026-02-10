import React, { createContext, useContext, useRef, useState, useEffect, cloneElement } from "react";
import { cn } from "@/lib/utils";

type MenuContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  // close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const trg = triggerRef.current;
      if (!trg) return;
      const target = e.target as Node;
      if (!trg.contains(target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <MenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const ctx = useContext(MenuContext);
  if (!ctx) return null;
  const { setOpen, triggerRef } = ctx;

  if (asChild && React.isValidElement(children)) {
    return cloneElement(children, {
      ref: (el: HTMLElement) => (triggerRef.current = el),
      onClick: (e: any) => {
        e?.stopPropagation?.();
        setOpen((v) => !v);
        if (typeof children.props.onClick === "function") children.props.onClick(e);
      },
    });
  }

  return (
    <button
      ref={(el) => (triggerRef.current = el)}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
      }}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, align = "end", className }: { children: React.ReactNode; align?: "start" | "end"; className?: string }) {
  const ctx = useContext(MenuContext);
  if (!ctx) return null;
  const { open, triggerRef } = ctx;

  // basic positioning: align end -> right 0, start -> left 0
  return (
    <div
      className={cn(
        "z-[100] mt-2 min-w-[12rem] rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-lg animate-in fade-in-0 zoom-in-95",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      style={{ display: open ? undefined : "none", position: "absolute" }}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onSelect, className }: { children: React.ReactNode; onSelect?: () => void; className?: string }) {
  return (
    <button
      role="menuitem"
      className={cn("w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors flex items-center", className)}
      onClick={() => onSelect?.()}
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400", className)}>{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-200 dark:bg-gray-800" />;
}

export { DropdownMenu as Root, DropdownMenuTrigger as Trigger, DropdownMenuContent as Content };

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

function DropdownMenu({ children, open, onOpenChange }: DropdownMenuProps) {
  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, onOpenChange } = React.useContext(DropdownMenuContext);

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as { onClick?: (e: React.MouseEvent) => void };
    return React.cloneElement(children, {
      ...props,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenChange(!open);
        childProps.onClick?.(e);
      },
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button
      className={cn(className)}
      onClick={(e) => {
        e.stopPropagation();
        onOpenChange(!open);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  children,
  className,
  align = "end",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  const { open, onOpenChange } = React.useContext(DropdownMenuContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 mt-1 w-56 rounded-md border border-slate-100 bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.09)]",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSectionTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="flex flex-col bg-white p-1.5" {...props}>
      <div className="flex w-full items-center gap-2 bg-white px-2 py-1.5">
        <div
          className={cn(
            "flex-1 text-sm font-semibold leading-5 text-slate-700",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function DropdownMenuDivider({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="flex w-full flex-col items-start bg-white" {...props}>
      <div className={cn("h-px w-full bg-slate-100", className)} />
    </div>
  );
}

function DropdownMenuItem({
  children,
  className,
  icon,
  onClick,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ReactNode }) {
  const { onOpenChange } = React.useContext(DropdownMenuContext);

  return (
    <div className="flex flex-col bg-white p-1.5" {...props}>
      <div
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 bg-white px-2 py-1.5 hover:bg-slate-50",
          className
        )}
        onClick={(e) => {
          onClick?.(e);
          onOpenChange(false);
        }}
      >
        {icon && <div className="h-4 w-4 shrink-0">{icon}</div>}
        <div className="flex-1 text-sm font-medium leading-5 text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSectionTitle,
  DropdownMenuDivider,
  DropdownMenuItem,
};

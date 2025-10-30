import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps {
  children: ReactNode;
  className?: string;
}

interface DataTableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface DataTableBodyProps {
  children: ReactNode;
  className?: string;
}

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div
      className={cn(
        "flex h-[570px] shrink-0 flex-col items-start self-stretch rounded-md border border-[#E5E5E5] bg-white overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DataTableHeader({ children, className }: DataTableHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start self-stretch border-b border-[#E5E5E5] bg-[#F5F5F5] rounded-t-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DataTableBody({ children, className }: DataTableBodyProps) {
  return <div className={cn("flex flex-col flex-1 overflow-y-auto", className)}>{children}</div>;
}

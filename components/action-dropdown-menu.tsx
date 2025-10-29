"use client";

import { Download, CheckCircle, XOctagon, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSectionTitle,
  DropdownMenuDivider,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ActionDropdownMenuProps {
  variant: "user" | "admin";
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction?: (action: string) => void;
}

export function ActionDropdownMenu({
  variant,
  trigger,
  open,
  onOpenChange,
  onAction,
}: ActionDropdownMenuProps) {
  const handleAction = (action: string) => {
    onAction?.(action);
  };

  const renderMenuItems = () => {
    switch (variant) {
      case "user":
        return (
          <DropdownMenuItem
            icon={<Download className="h-4 w-4 stroke-slate-700 stroke-2" />}
            onClick={() => handleAction("download")}
          >
            다운로드
          </DropdownMenuItem>
        );

      case "admin":
        return (
          <>
            <DropdownMenuItem
              icon={<CheckCircle className="h-4 w-4 stroke-slate-700 stroke-2" />}
              onClick={() => handleAction("approve")}
            >
              승인
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={<XOctagon className="h-4 w-4 stroke-slate-700 stroke-2" />}
              onClick={() => handleAction("reject")}
            >
              거부
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={<AlertTriangle className="h-4 w-4 stroke-slate-700 stroke-2" />}
              onClick={() => handleAction("block")}
            >
              차단
            </DropdownMenuItem>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSectionTitle>관리</DropdownMenuSectionTitle>
        <DropdownMenuDivider />
        {renderMenuItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

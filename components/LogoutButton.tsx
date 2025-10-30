"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      className="self-stretch justify-start gap-2 p-2 h-auto hover:bg-[#E5E7EB]"
    >
      <LogOut className="h-4 w-4 stroke-[#737373]" strokeWidth={1.25} />
      <div className="flex flex-1 flex-col items-start">
        <span className="text-xs font-normal leading-4 text-[#737373] text-left">
          로그아웃
        </span>
      </div>
    </Button>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UsersRound, Settings, FileText } from "lucide-react";
import { LogoutButton } from "@/components/common/LogoutButton";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "회원 관리",
    href: "/admin",
    icon: UsersRound,
  },
  {
    label: "GPT 모델 설정",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    label: "분석 이력",
    href: "/admin/history",
    icon: FileText,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-[255px] shrink-0 flex-col rounded-lg border border-[#D4D4D4] bg-[#FAFAFA] sticky top-5 max-h-[calc(100vh-2.5rem)]">
      <div className="flex flex-col items-start gap-2 p-2">
        <div className="flex items-center gap-2 self-stretch p-2">
          <div className="flex flex-1 flex-col items-start">
            <h2 className="self-stretch text-lg font-bold leading-7 text-[#64748B]">
              관리자 패널
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-start self-stretch px-4 py-2 overflow-y-auto">
        <div className="flex flex-col items-start gap-1 self-stretch">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-8 items-center gap-2 self-stretch rounded-md px-2 py-2 transition-colors",
                  isActive ? "bg-[#0F172A]" : "hover:bg-[#E5E7EB]"
                )}
              >
                <Icon
                  className="h-4 w-4"
                  stroke={isActive ? "#FFFFFF" : "#0A0A0A"}
                  strokeWidth={1.25}
                />
                <span
                  className={cn(
                    "text-sm font-normal leading-5",
                    isActive ? "text-white" : "text-[#0A0A0A]"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2.5 self-stretch p-2">
        <LogoutButton />
      </div>
    </div>
  );
}

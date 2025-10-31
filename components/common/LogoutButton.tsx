"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // localStorage에서 토큰과 사용자 정보 제거
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    
    // 로그인 페이지로 이동
    router.push("/login");
  };

  return (
    <Button
      variant="ghost"
      className="self-stretch justify-start gap-2 p-2 h-auto hover:bg-[#E5E7EB]"
      onClick={handleLogout}
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

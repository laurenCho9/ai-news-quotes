"use client";

import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/common/LogoutButton";

export function UserSidebar() {
  return (
    <div className="flex w-[255px] shrink-0 flex-col rounded-lg border border-[#D4D4D4] bg-[#FAFAFA] sticky top-5 max-h-[calc(100vh-2.5rem)]">
      <div className="flex flex-col items-start gap-2 p-2">
        <div className="flex items-center gap-2 self-stretch p-2">
          <div className="flex flex-1 flex-col items-start">
            <h1 className="self-stretch text-lg font-bold leading-7 text-[#64748B]">
              AI 뉴스 분석
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-start self-stretch px-4 py-2 overflow-y-auto">
        <div className="flex flex-col items-center gap-2 self-stretch">
          <Button className="w-full gap-2 bg-slate-900 hover:bg-slate-800">
            <Upload className="h-4 w-4 text-white" />
            <span className="text-sm leading-6 text-white">파일 업로드</span>
          </Button>
          <Button className="w-full gap-2 bg-[#64748B] hover:bg-[#64748B]/90">
            <Plus className="h-4 w-4 text-white" />
            <span className="text-sm leading-6 text-white">업로드하기</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2.5 self-stretch p-2">
        <LogoutButton />
      </div>
    </div>
  );
}

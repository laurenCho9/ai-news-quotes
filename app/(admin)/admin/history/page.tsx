"use client";

import { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Loader,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ActionDropdownMenu } from "@/components/common/ActionDropdownMenu";
import { cn } from "@/lib/utils";

const historyData = [
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-4",
    status: "analyzing",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-3.5-turbo",
    status: "completed",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-4",
    status: "analyzing",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-4",
    status: "completed",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-4",
    status: "completed",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-4",
    status: "analyzing",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-3.5-turbo",
    status: "completed",
  },
  {
    user: "user_001",
    filename: "files.csv",
    uploadedAt: "2024-10-15 14:30",
    model: "GPT-3.5-turbo",
    status: "analyzing",
  },
];

export default function AnalysisHistoryPage() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col items-end gap-6 py-6">
      <h1 className="h-7 self-stretch text-2xl font-bold leading-8 -tracking-[0.144px] text-[#0F172A]">
        전체 분석 이력
      </h1>

      <div className="flex h-[622px] flex-col items-start gap-4 self-stretch">
        <div className="flex h-[570px] shrink-0 flex-col items-start self-stretch rounded-md border border-border bg-white">
          <div className="flex items-start self-stretch border-b border-border bg-[#F5F5F5]">
            <div className="flex h-10 flex-1 flex-col items-start justify-center px-8">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  사용자
                </span>
              </div>
            </div>
            <div className="flex h-10 flex-1 flex-col items-start justify-center px-8">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  파일명
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[200px] flex-col items-start justify-center px-2">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  업로드 일시
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[200px] flex-col items-start justify-center px-2">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  모델
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[108.18px] flex-col items-start justify-center px-2">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  상태
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[49.51px] flex-col items-end justify-center px-2"></div>
          </div>

          {historyData.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start self-stretch",
                index !== historyData.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex h-[53px] flex-1 flex-col items-start justify-center px-8 py-2">
                <div className="flex items-center self-stretch">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {item.user}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] flex-1 flex-col items-start justify-center px-8 py-2">
                <div className="flex items-center self-stretch">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {item.filename}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] w-[200px] flex-col items-start justify-center px-2 py-2">
                <div className="flex items-center justify-end">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {item.uploadedAt}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] w-[200px] flex-col items-start justify-center px-2 py-2">
                <div className="flex items-center justify-end">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {item.model}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] w-[108.18px] flex-col items-start justify-center px-2 py-2">
                <div className="flex h-[22px] shrink-0 items-center justify-center gap-1 rounded-md border border-border bg-white px-1.5 py-0.5">
                  {item.status === "analyzing" ? (
                    <>
                      <Loader className="h-3 w-3" stroke="#737373" />
                      <span className="text-xs font-medium leading-4 text-[#737373]">
                        분석중
                      </span>
                    </>
                  ) : (
                    <>
                      <CircleCheck className="h-3 w-3 fill-[#22C55E] stroke-none" />
                      <span className="text-xs font-medium leading-4 text-[#737373]">
                        분석완료
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex h-[53px] w-[49.51px] items-center justify-between px-2 py-2">
                <ActionDropdownMenu
                  variant="user"
                  open={openDropdownId === index}
                  onOpenChange={(open) =>
                    setOpenDropdownId(open ? index : null)
                  }
                  onAction={(action) => {
                    console.log(`Action: ${action} for item ${item.user}`);
                  }}
                  trigger={
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-[#0A0A0A]" />
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-9 shrink-0 items-center justify-center gap-2 self-stretch">
          <div className="flex items-center gap-1">
            <Button variant="ghost" className="h-9 gap-1 px-3">
              <ChevronLeft className="h-4 w-4" stroke="#0A0A0A" />
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                이전
              </span>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9">
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                1
              </span>
            </Button>

            <Button variant="outline" size="icon" className="h-9 w-9 shadow-sm">
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                2
              </span>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9">
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                3
              </span>
            </Button>

            <div className="flex h-9 w-9 items-center justify-center rounded-md p-2.5">
              <Ellipsis className="h-4 w-4 shrink-0" stroke="#0A0A0A" />
            </div>

            <Button variant="ghost" className="h-9 gap-1 px-3">
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                다음
              </span>
              <ChevronRight className="h-4 w-4" stroke="#0A0A0A" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

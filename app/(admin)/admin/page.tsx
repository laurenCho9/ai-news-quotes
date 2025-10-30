"use client";

import { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchFilterSelect } from "@/components/common/SearchFilterSelect";
import { ActionDropdownMenu } from "@/components/common/ActionDropdownMenu";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import { cn } from "@/lib/utils";

const members = [
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "pending",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "approved",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "blocked",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "approved",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "pending",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "pending",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "approved",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "blocked",
  },
  {
    id: "user_001",
    name: "홍길동",
    ip: "192.168.1.100",
    date: "2024-10-15",
    status: "approved",
  },
];

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col items-end gap-6 py-6">
      <h1 className="h-7 self-stretch text-2xl font-bold leading-8 tracking-tight text-[#0F172A]">
        회원 관리
      </h1>

      <div className="flex items-start gap-2.5 self-stretch">
        <SearchFilterSelect variant="admin" />

        <div className="flex items-center rounded-md border border-[#E5E5E5] bg-white">
          <div className="flex h-9 w-[195.33px] items-center justify-between border-r border-[#E5E5E5] px-3 py-1">
            <input
              type="text"
              placeholder="검색할 내용을 입력하세요..."
              className="flex-1 text-sm leading-5 text-[#171717] placeholder:text-[#737373] outline-none bg-transparent"
            />
          </div>
          <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center">
            <Search className="h-4 w-4" stroke="#0A0A0A" />
          </div>
        </div>
      </div>

      <div className="flex h-[622px] flex-col items-start gap-4 self-stretch">
        <div className="flex h-[570px] shrink-0 flex-col items-start self-stretch rounded-md border border-[#E5E5E5] bg-white overflow-hidden">
          <div className="flex items-start self-stretch border-b border-[#E5E5E5] bg-[#F5F5F5] rounded-t-md">
            <div className="flex h-10 flex-1 flex-col items-start justify-center px-8">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  아이디
                </span>
              </div>
            </div>
            <div className="flex h-10 flex-1 flex-col items-start justify-center px-8">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  이름
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[200px] flex-col items-start justify-center px-2">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  IP
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[200px] flex-col items-start justify-center px-2">
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  가입일
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

          {members.map((member, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start self-stretch",
                index !== members.length - 1 && "border-b border-[#E5E5E5]"
              )}
            >
              <div className="flex h-[53px] flex-1 flex-col items-start justify-center px-8 py-2">
                <div className="flex items-center self-stretch">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {member.id}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] flex-1 flex-col items-start justify-center px-8 py-2">
                <div className="flex items-center self-stretch">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {member.name}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] w-[200px] flex-col items-start justify-center px-2 py-2">
                <div className="flex items-center justify-end">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {member.ip}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] w-[200px] flex-col items-start justify-center px-2 py-2">
                <div className="flex items-center justify-end">
                  <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                    {member.date}
                  </span>
                </div>
              </div>
              <div className="flex h-[53px] w-[108.18px] flex-col items-start justify-center px-2 py-2">
                <Badge
                  variant={
                    member.status === "approved"
                      ? "default"
                      : member.status === "blocked"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {member.status === "approved"
                    ? "승인 완료"
                    : member.status === "blocked"
                    ? "차단"
                    : "승인대기"}
                </Badge>
              </div>
              <div className="flex h-[53px] w-[49.51px] items-center justify-between px-2 py-2">
                <ActionDropdownMenu
                  variant="admin"
                  open={openDropdownId === index}
                  onOpenChange={(open) =>
                    setOpenDropdownId(open ? index : null)
                  }
                  onAction={(action) => {
                    console.log(`Action: ${action} for member ${member.id}`);
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

        <DataTablePagination
          currentPage={currentPage}
          totalPages={9}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

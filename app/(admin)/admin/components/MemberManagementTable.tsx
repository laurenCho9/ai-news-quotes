"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchFilterSelect } from "@/components/common/SearchFilterSelect";
import { ActionDropdownMenu } from "@/components/common/ActionDropdownMenu";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import { cn } from "@/lib/utils";
import { membersApi, type User, type UserStatus } from "@/lib/api";

export function MemberManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // 회원 목록 조회
  const { data: membersData, isLoading } = useQuery({
    queryKey: ["members", searchQuery],
    queryFn: () => membersApi.getMembers(),
  });

  // 승인 mutation
  const approveMutation = useMutation({
    mutationFn: (userId: number) => membersApi.approveMember(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      alert("사용자가 승인되었습니다.");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "승인에 실패했습니다.";
      alert(errorMessage);
    },
  });

  // 거부 mutation
  const rejectMutation = useMutation({
    mutationFn: (userId: number) => membersApi.rejectMember(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      alert("사용자가 거부되었습니다.");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "거부에 실패했습니다.";
      alert(errorMessage);
    },
  });

  // 차단 mutation
  const blockMutation = useMutation({
    mutationFn: (userId: number) => membersApi.blockMember(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      alert("사용자가 차단되었습니다.");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "차단에 실패했습니다.";
      alert(errorMessage);
    },
  });

  const handleAction = (action: string, userId: number) => {
    switch (action) {
      case "approve":
        approveMutation.mutate(userId);
        break;
      case "reject":
        rejectMutation.mutate(userId);
        break;
      case "block":
        blockMutation.mutate(userId);
        break;
    }
  };

  const getStatusBadge = (status?: UserStatus) => {
    const variant =
      status === "approved"
        ? "default"
        : status === "blocked" || status === "rejected"
        ? "destructive"
        : "secondary";

    const label =
      status === "approved"
        ? "승인 완료"
        : status === "blocked"
        ? "차단"
        : status === "rejected"
        ? "승인거부"
        : "승인대기";

    return <Badge variant={variant}>{label}</Badge>;
  };

  const members = membersData?.items || [];

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-sm text-[#737373]">로딩 중...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-sm text-[#737373]">회원이 없습니다.</p>
            </div>
          ) : (
            members.map((member: User, index: number) => (
              <div
                key={member.id}
                className={cn(
                  "flex items-start self-stretch",
                  index !== members.length - 1 && "border-b border-[#E5E5E5]"
                )}
              >
                <div className="flex h-[53px] flex-1 flex-col items-start justify-center px-8 py-2">
                  <div className="flex items-center self-stretch">
                    <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                      {member.email}
                    </span>
                  </div>
                </div>
                <div className="flex h-[53px] flex-1 flex-col items-start justify-center px-8 py-2">
                  <div className="flex items-center self-stretch">
                    <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                      {member.full_name || "-"}
                    </span>
                  </div>
                </div>
                <div className="flex h-[53px] w-[200px] flex-col items-start justify-center px-2 py-2">
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                      {member.signup_ip || "-"}
                    </span>
                  </div>
                </div>
                <div className="flex h-[53px] w-[200px] flex-col items-start justify-center px-2 py-2">
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-normal leading-5 text-[#0A0A0A]">
                      {new Date(member.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
                <div className="flex h-[53px] w-[108.18px] flex-col items-start justify-center px-2 py-2">
                  {getStatusBadge(member.status)}
                </div>
                <div className="flex h-[53px] w-[49.51px] items-center justify-between px-2 py-2">
                  <ActionDropdownMenu
                    variant="admin"
                    open={openDropdownId === member.id}
                    onOpenChange={(open) =>
                      setOpenDropdownId(open ? member.id : null)
                    }
                    onAction={(action) => handleAction(action, member.id)}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-8 w-8"
                      >
                        <MoreVertical className="h-4 w-4 text-[#0A0A0A]" />
                      </Button>
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <DataTablePagination
          currentPage={currentPage}
          totalPages={Math.ceil((membersData?.total || 0) / 20)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

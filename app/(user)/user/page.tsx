"use client";

import { useState } from "react";
import {
  Upload,
  Plus,
  Loader2,
  CircleCheck,
  MoreVertical,
  Search,
  Download,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { SearchFilterSelect } from "@/components/search-filter-select";
import { ActionDropdownMenu } from "@/components/action-dropdown-menu";

type AnalysisStatus = "분석중" | "분석완료";

interface AnalysisRecord {
  id: number;
  filename: string;
  uploadDate: string;
  status: AnalysisStatus;
}

const mockData: AnalysisRecord[] = [
  {
    id: 1,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석중",
  },
  {
    id: 2,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석완료",
  },
  {
    id: 3,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석완료",
  },
  {
    id: 4,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석완료",
  },
  {
    id: 5,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석중",
  },
  {
    id: 6,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석중",
  },
  {
    id: 7,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석완료",
  },
  {
    id: 8,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석완료",
  },
  {
    id: 9,
    filename: "filename.csv",
    uploadDate: "2024-10-15 14:30",
    status: "분석완료",
  },
];

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-5">
      <div className="flex w-full max-w-[1399px] items-start gap-4">
        <aside className="flex w-[255px] flex-col rounded-lg border border-[#D4D4D4] bg-[#FAFAFA]">
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-2 p-2">
              <div className="flex flex-1 flex-col">
                <h1 className="font-bold text-lg leading-7 text-[#64748B]">
                  AI 뉴스 분석
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col px-4 py-2">
            <div className="flex flex-col items-center gap-2">
              <Button className="w-full gap-2 bg-slate-900 hover:bg-slate-800">
                <Upload className="h-4 w-4 text-white" />
                <span className="text-sm leading-6 text-white">
                  파일 업로드
                </span>
              </Button>
              <Button className="w-full gap-2 bg-[#64748B] hover:bg-[#64748B]/90">
                <Plus className="h-4 w-4 text-white" />
                <span className="text-sm leading-6 text-white">업로드하기</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 p-2">
            <LogoutButton />
          </div>
        </aside>

        <main className="flex flex-1 flex-col gap-6 py-6">
          <h2 className="text-2xl font-bold leading-8 tracking-[-0.144px] text-slate-900">
            분석 이력
          </h2>

          <div className="flex items-start gap-2.5">
            <SearchFilterSelect variant="user" />

            <div className="flex items-center rounded-md border border-[#D4D4D4] bg-white">
              <div className="flex h-9 items-center border-r border-[#D4D4D4] px-3 py-1">
                <input
                  type="text"
                  placeholder="검색할 내용을 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[195px] text-sm leading-5 text-[#737373] placeholder:text-[#737373] outline-none"
                />
              </div>
              <div className="flex h-9 w-9 items-center justify-center">
                <Search className="h-4 w-4 text-[#0A0A0A]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex h-[570px] flex-col rounded-md border border-[#D4D4D4] bg-white">
              <div className="flex items-start border-b border-[#D4D4D4] bg-[#F5F5F5]">
                <div className="flex flex-1 flex-col justify-center gap-2.5 px-8 py-0 h-10">
                  <span className="text-sm font-medium leading-5 text-[#0A0A0A] bg-white">
                    파일명
                  </span>
                </div>
                <div className="flex w-[172.56px] flex-col justify-center gap-2.5 px-2 py-0 h-10">
                  <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                    업로드 일시
                  </span>
                </div>
                <div className="flex w-[108.18px] flex-col justify-center gap-2.5 px-2 py-0 h-10">
                  <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                    상태
                  </span>
                </div>
                <div className="flex w-[49.51px] flex-col justify-end gap-2.5 px-2 py-0 h-10"></div>
              </div>

              {mockData.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start border-b border-[#D4D4D4]"
                >
                  <div className="flex flex-1 flex-col justify-center gap-2.5 px-8 py-2 min-h-[53px]">
                    <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                      {record.filename}
                    </span>
                  </div>
                  <div className="flex w-[172.56px] flex-col justify-center gap-2.5 px-2 py-2 min-h-[53px]">
                    <span className="text-sm leading-5 text-[#0A0A0A]">
                      {record.uploadDate}
                    </span>
                  </div>
                  <div className="flex w-[108.18px] flex-col justify-center gap-2.5 px-2 py-2 min-h-[53px]">
                    <div className="flex h-[22px] items-center justify-center gap-1 rounded-md border border-[#D4D4D4] bg-white px-1.5 py-0.5">
                      {record.status === "분석중" ? (
                        <>
                          <Loader2 className="h-3 w-3 text-[#737373]" />
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
                  <div className="flex w-[49.51px] items-center justify-between px-2 py-2 min-h-[53px]">
                    <ActionDropdownMenu
                      variant="user"
                      open={openDropdownId === record.id}
                      onOpenChange={(open) =>
                        setOpenDropdownId(open ? record.id : null)
                      }
                      onAction={(action) => {
                        console.log(
                          `Action: ${action} for record ${record.id}`
                        );
                      }}
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
              ))}
            </div>

            <div className="flex h-9 items-center justify-center gap-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className="h-9 gap-1 px-3"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12L6 8L10 4"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                        이전
                      </span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      className="h-9 w-9 p-2.5 rounded-md"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 2}
                      onClick={() => setCurrentPage(2)}
                      className="h-9 w-9 p-2.5 rounded-md"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 3}
                      onClick={() => setCurrentPage(3)}
                      className="h-9 w-9 p-2.5 rounded-md"
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="h-9 gap-1 px-3"
                    >
                      <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                        다음
                      </span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPage;

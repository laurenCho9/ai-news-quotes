"use client";

import { useState } from "react";
import { Loader, Check, MoreVertical, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserSidebar } from "@/app/(user)/components/UserSidebar";
import { SearchFilterSelect } from "@/components/common/SearchFilterSelect";
import { ActionDropdownMenu } from "@/components/common/ActionDropdownMenu";
import { DataTablePagination } from "@/components/common/DataTablePagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-5">
      <div className="flex w-full max-w-[1399px] items-stretch gap-4">
        <UserSidebar />

        <main className="flex flex-1 flex-col gap-6 py-6">
          <h2 className="text-2xl font-bold leading-8 tracking-[-0.144px] text-slate-900">
            분석 이력
          </h2>

          <div className="flex items-start gap-2.5">
            <SearchFilterSelect variant="user" />

            <div className="flex items-center rounded-md border border-[#E5E5E5] bg-white">
              <div className="flex h-9 items-center border-r border-[#E5E5E5] px-3 py-1">
                <input
                  type="text"
                  placeholder="검색할 내용을 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[195px] text-sm leading-5 text-[#171717] placeholder:text-[#737373] outline-none"
                />
              </div>
              <div className="flex h-9 w-9 items-center justify-center">
                <Search className="h-4 w-4 text-[#0A0A0A]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex h-[570px] flex-col rounded-md border border-[#E5E5E5] bg-white overflow-hidden">
              <div className="flex items-start border-b border-[#E5E5E5] bg-[#F5F5F5] rounded-t-md">
                <div className="flex flex-1 flex-col justify-center gap-2.5 px-8 py-0 h-10">
                  <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
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
                  className="flex items-start border-b border-[#E5E5E5]"
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
                    <div className="inline-flex items-center gap-1 rounded-md border border-[#E5E5E5] bg-white py-[3px] px-[6px] w-fit">
                      {record.status === "분석중" ? (
                        <>
                          <Loader className="h-3 w-3 text-[#737373]" />
                          <span className="text-xs font-medium leading-4 text-[#737373]">
                            분석중
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#22C55E]">
                            <Check
                              className="h-2 w-2 text-white"
                              strokeWidth={3}
                            />
                          </div>
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

            <DataTablePagination
              currentPage={currentPage}
              totalPages={9}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPage;

"use client";

import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/Pagination";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages = 9,
  onPageChange,
}: DataTablePaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 표시할 페이지 번호 계산 (최대 3개)
  const getVisiblePages = () => {
    const pages: number[] = [];

    if (totalPages <= 3) {
      // 전체 페이지가 3개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지 기준으로 3개 표시
      if (currentPage === 1) {
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showEllipsis = totalPages > 3 && currentPage < totalPages - 1;

  return (
    <div className="flex h-9 shrink-0 items-center justify-center gap-2 self-stretch">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="h-9 gap-1 px-3"
            >
              <ChevronLeft className="h-4 w-4" stroke="#0A0A0A" />
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                이전
              </span>
            </Button>
          </PaginationItem>

          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                className="h-9 w-9 border-[#E5E5E5]"
              >
                <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                  {page}
                </span>
              </PaginationLink>
            </PaginationItem>
          ))}

          {showEllipsis && (
            <PaginationItem>
              <div className="flex h-9 w-9 items-center justify-center rounded-md p-2.5">
                <Ellipsis className="h-4 w-4 shrink-0" stroke="#0A0A0A" />
              </div>
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="h-9 gap-1 px-3"
            >
              <span className="text-sm font-medium leading-5 text-[#0A0A0A]">
                다음
              </span>
              <ChevronRight className="h-4 w-4" stroke="#0A0A0A" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

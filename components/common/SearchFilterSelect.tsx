"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SearchFilterVariant = "user" | "admin";

interface SearchFilterSelectProps {
  variant: SearchFilterVariant;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function SearchFilterSelect({
  variant,
  value,
  onValueChange,
}: SearchFilterSelectProps) {
  const getDefaultValue = () => {
    switch (variant) {
      case "user":
        return "filename";
      case "admin":
        return "id";
      default:
        return "";
    }
  };

  const getPlaceholder = () => {
    switch (variant) {
      case "user":
        return "파일명";
      case "admin":
        return "아이디";
      default:
        return "검색항목";
    }
  };

  const renderOptions = () => {
    switch (variant) {
      case "user":
        return (
          <>
            <SelectItem value="filename">파일명</SelectItem>
            <SelectItem value="upload-date">업로드 일시</SelectItem>
            <SelectItem value="status">상태</SelectItem>
          </>
        );
      case "admin":
        return (
          <>
            <SelectItem value="id">아이디</SelectItem>
            <SelectItem value="name">이름</SelectItem>
            <SelectItem value="ip">IP</SelectItem>
            <SelectItem value="join-date">가입일</SelectItem>
            <SelectItem value="status">상태</SelectItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Select
      defaultValue={getDefaultValue()}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[180px] bg-white border-[#E5E5E5]">
        <SelectValue placeholder={getPlaceholder()} />
      </SelectTrigger>
      <SelectContent className="bg-white border-[#E5E5E5]">
        <SelectGroup>
          <div className="px-2 py-1.5 text-xs text-muted-foreground">
            검색항목
          </div>
          {renderOptions()}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

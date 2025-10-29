"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchFilterSelect() {
  return (
    <Select defaultValue="filename">
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="파일명" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <div className="px-2 py-1.5 text-xs text-muted-foreground">
            검색항목
          </div>
          <SelectItem value="filename">파일명</SelectItem>
          <SelectItem value="upload-date">업로드 일시</SelectItem>
          <SelectItem value="status">상태</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function SettingsPage() {
  const [model, setModel] = useState("gpt-4");
  const [maxTokens, setMaxTokens] = useState(3000);
  const [systemPrompt, setSystemPrompt] = useState("");

  const incrementTokens = () => {
    setMaxTokens((prev) => Math.min(prev + 100, 10000));
  };

  const decrementTokens = () => {
    setMaxTokens((prev) => Math.max(prev - 100, 100));
  };

  const handleSave = () => {
    console.log("Settings saved:", { model, maxTokens, systemPrompt });
  };

  return (
    <div className="flex flex-1 flex-col items-end gap-6 py-6">
      <h1 className="h-7 self-stretch text-2xl font-bold leading-8 tracking-tight text-[#0F172A]">
        GPT 모델 설정
      </h1>

      <div className="flex flex-col items-end gap-11 self-stretch rounded-lg border border-[#CBD5E1] bg-white px-5 py-6">
        <div className="flex flex-col items-start gap-11 self-stretch">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center justify-center gap-2.5">
              <label className="text-sm font-medium leading-5 text-[#0A0A0A]">
                사용 모델 선택
              </label>
            </div>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="h-9 w-full justify-between rounded-md border border-border bg-white px-3 py-2">
                <SelectValue placeholder="GPT-4" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center justify-center gap-2.5">
              <label className="text-sm font-medium leading-5 text-[#0A0A0A]">
                Max Tokens
              </label>
            </div>
            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex h-9 items-center gap-16 self-stretch rounded-md border border-border bg-white px-3 py-1">
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Number(e.target.value))}
                  className="flex-1 text-sm leading-5 text-[#737373] outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center rounded-md border border-border bg-white">
                <Button
                  onClick={incrementTokens}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none border-r border-b border-border hover:bg-[#F5F5F5]"
                >
                  <Plus className="h-4 w-4 shrink-0" stroke="#0A0A0A" />
                </Button>
                <Button
                  onClick={decrementTokens}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none hover:bg-[#F5F5F5]"
                >
                  <Minus className="h-4 w-4 shrink-0" stroke="#0A0A0A" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center justify-center gap-2.5">
              <label className="text-sm font-medium leading-5 text-[#0A0A0A]">
                시스템 프롬프트
              </label>
            </div>
            <div className="relative flex h-20 items-start justify-between self-stretch rounded-md border border-border bg-white px-3 py-2">
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="뉴스 기사를 분석하는 AI 시스템 프롬프트를 입력하세요..."
                className="flex-1 resize-none text-base leading-6 text-[#0A0A0A] placeholder:text-[#737373] outline-none bg-transparent"
              />
              <div className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5">
                <div className="absolute left-0 top-0 h-0 w-2.5 bg-[#0A0A0A]"></div>
                <div className="absolute left-1 top-1 h-0 w-1 bg-[#0A0A0A]"></div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="flex items-center justify-center gap-2.5 rounded-md bg-[#0F172A] px-4 py-2 text-sm font-medium leading-6 text-white hover:bg-[#0F172A]/90"
        >
          설정 저장
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] px-4">
      <div className="w-full max-w-[425px] rounded-lg border border-[#CBD5E1] bg-white p-6">
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-lg font-bold leading-7 text-[#0F172A]">
              AI 뉴스 분석 시스템
            </h1>
          </div>

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-normal leading-5 text-black">
                아이디
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-normal leading-5 text-black">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-[#0F172A] px-4 py-2 text-sm font-normal leading-6 text-white hover:bg-[#0F172A]/90 transition-colors"
              >
                로그인
              </button>
              <button 
                type="button"
                onClick={handleRegister}
                className="flex flex-1 items-center justify-center gap-2.5 rounded-md border border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2 text-sm font-normal leading-6 text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

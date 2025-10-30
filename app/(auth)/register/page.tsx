"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    setIsApprovalModalOpen(true);
  };

  const handleConfirm = () => {
    setIsApprovalModalOpen(false);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] px-4 py-[231px]">
      <div className="w-full max-w-[425px] rounded-lg border border-[#CBD5E1] bg-white p-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-lg font-bold leading-7 text-[#0F172A]">
              회원가입
            </h1>
          </div>

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-sm font-normal leading-5 text-black"
              >
                아이디
              </label>
              <input
                id="username"
                type="email"
                placeholder="이메일을 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-normal leading-5 text-black"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password-confirm"
                className="text-sm font-normal leading-5 text-black"
              >
                비밀번호 확인
              </label>
              <input
                id="password-confirm"
                type="password"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-normal leading-5 text-black"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                placeholder="이름을 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ip-address"
                className="text-sm font-normal leading-5 text-black"
              >
                IP 주소
              </label>
              <input
                id="ip-address"
                type="text"
                placeholder="IP 주소를 입력해주세요."
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleRegister}
                className="flex-1 bg-[#0F172A] hover:bg-[#0F172A]/90"
              >
                가입
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#E2E8F0] bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]"
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-[512px] rounded-[6px] border border-[#CBD5E1] bg-white p-6 gap-4"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold leading-7 text-[#0F172A]">
              승인 대기 중
            </h2>
            <p className="text-sm font-normal leading-5 text-[#64748B]">
              관리자가 회원가입을 검토중입니다. 승인 후 서비스 이용이
              가능합니다.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleConfirm}
              className="bg-[#0F172A] hover:bg-[#0F172A]/90"
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

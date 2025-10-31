"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Zod 스키마 정의
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(/[A-Z]/, "비밀번호는 최소 1개의 대문자를 포함해야 합니다")
      .regex(/[a-z]/, "비밀번호는 최소 1개의 소문자를 포함해야 합니다")
      .regex(/[0-9]/, "비밀번호는 최소 1개의 숫자를 포함해야 합니다"),
    password_confirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    name: z.string().min(1, "이름을 입력해주세요"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["password_confirm"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>("로딩 중...");
  const router = useRouter();

  // IP 주소 가져오기
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        setIpAddress("IP 주소를 가져올 수 없습니다");
      }
    };
    fetchIpAddress();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      setIsApprovalModalOpen(true);
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "회원가입에 실패했습니다";
      alert(errorMessage);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  const handleConfirm = () => {
    setIsApprovalModalOpen(false);
    router.push("/login");
  };

  const handleCancel = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] p-4">
      <div className="w-full max-w-[425px] rounded-lg border border-[#CBD5E1] bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-lg font-bold leading-7 text-[#0F172A]">
                회원가입
              </h1>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-normal leading-5 text-black"
                >
                  아이디
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  {...register("email")}
                  className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
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
                  {...register("password")}
                  className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password_confirm"
                  className="text-sm font-normal leading-5 text-black"
                >
                  비밀번호 확인
                </label>
                <input
                  id="password_confirm"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  {...register("password_confirm")}
                  className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
                />
                {errors.password_confirm && (
                  <p className="text-xs text-red-500">
                    {errors.password_confirm.message}
                  </p>
                )}
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
                  {...register("name")}
                  className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="ip_address"
                  className="text-sm font-normal leading-5 text-black"
                >
                  IP 주소
                </label>
                <input
                  id="ip_address"
                  type="text"
                  value={ipAddress}
                  readOnly
                  disabled
                  className="rounded-md border border-[#CBD5E1] bg-[#F1F5F9] px-3 py-2 text-sm leading-5 text-[#64748B] cursor-not-allowed"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="flex-1 bg-[#0F172A] hover:bg-[#0F172A]/90"
                >
                  {signupMutation.isPending ? "처리 중..." : "가입"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 border-[#E2E8F0] bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-[512px] rounded-[6px] border border-[#CBD5E1] bg-white p-6 gap-4"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold leading-7 text-[#0F172A]">
              회원가입 완료
            </h2>
            <p className="text-sm font-normal leading-5 text-[#64748B]">
              회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.
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

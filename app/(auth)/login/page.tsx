"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

// Zod 스키마 정의
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // JWT 토큰 저장
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // role에 따라 리다이렉트
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "로그인에 실패했습니다";
      alert(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] p-4">
      <div className="w-full max-w-[425px] rounded-lg border border-[#CBD5E1] bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-lg font-bold leading-7 text-[#0F172A]">
                AI 뉴스 분석 시스템
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
                  autoComplete="off"
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
                  autoComplete="new-password"
                  {...register("password")}
                  className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-5 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-0"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="flex-1 bg-[#0F172A] hover:bg-[#0F172A]/90"
                >
                  {loginMutation.isPending ? "로그인 중..." : "로그인"}
                </Button>
                <Button
                  type="button"
                  onClick={handleRegister}
                  variant="outline"
                  className="flex-1 border-[#E2E8F0] bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]"
                >
                  회원가입
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

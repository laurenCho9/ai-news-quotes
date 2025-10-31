import { apiClient } from "./api-client";

// 타입 정의
export interface SignupRequest {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  ip_address?: string; // 회원가입 시 IP 주소
}

export interface SignupResponse {
  // ✅ 새로 추가
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  // ✅ 새로 추가
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export type UserStatus = "pending" | "approved" | "rejected" | "blocked";

export interface User {
  id: number;
  email: string;
  name?: string;
  role: string;
  is_active: boolean;
  status?: UserStatus;
  ip_address?: string;
  created_at: string;
}

export interface ModelSettings {
  id: number;
  model_name: string;
  temperature: number;
  max_tokens: number;
}

export interface Job {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

// Auth API
export const authApi = {
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await apiClient.post<SignupResponse>(
      "/api/v1/auth/signup",
      data
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/api/v1/auth/login",
      data
    );
    return response.data;
  },
};

export interface MembersResponse {
  total_count: number;
  items: User[];
}

export interface GetMembersParams {
  query?: string;
  filter_by?: "email" | "name";
  sort?: "asc" | "desc";
  current_page?: number;
  page_size?: number;
}

// Members API
export const membersApi = {
  getMembers: async (params?: GetMembersParams) => {
    const response = await apiClient.get<MembersResponse>("/api/v1/members", {
      params,
    });
    return response.data;
  },

  toggleMember: async (userId: number) => {
    const response = await apiClient.patch(`/api/v1/members/${userId}/toggle`);
    return response.data;
  },

  approveMember: async (userId: number) => {
    const response = await apiClient.patch(`/api/v1/members/${userId}/approve`);
    return response.data;
  },

  rejectMember: async (userId: number) => {
    const response = await apiClient.patch(`/api/v1/members/${userId}/reject`);
    return response.data;
  },

  blockMember: async (userId: number) => {
    const response = await apiClient.patch(`/api/v1/members/${userId}/block`);
    return response.data;
  },
};

// Model Settings API
export const modelSettingsApi = {
  getSettings: async () => {
    const response = await apiClient.get<ModelSettings>(
      "/api/v1/model-settings"
    );
    return response.data;
  },

  upsertSettings: async (data: Partial<ModelSettings>) => {
    const response = await apiClient.post("/api/v1/model-settings", data);
    return response.data;
  },
};

// Jobs API
export const jobsApi = {
  getJobs: async () => {
    const response = await apiClient.get<Job[]>("/api/v1/jobs");
    return response.data;
  },

  createJob: async (data: { title: string; description?: string }) => {
    const response = await apiClient.post("/api/v1/jobs", data);
    return response.data;
  },
};

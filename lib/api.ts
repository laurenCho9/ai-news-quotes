import { apiClient } from "./api-client";

// 타입 정의
export interface SignupRequest {
  email: string;
  password: string;
  password_confirm: string; // ✅ 추가
  name: string;
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

export interface User {
  id: number;
  email: string;
  full_name?: string; // ✅ name → full_name
  role: string; // ✅ 추가
  is_active: boolean;
  signup_ip?: string; // ✅ 추가
  last_login_ip?: string; // ✅ 추가
  created_at: string;
  updated_at: string; // ✅ 추가
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

// Members API
export const membersApi = {
  getMembers: async () => {
    const response = await apiClient.get<User[]>("/api/v1/members");
    return response.data;
  },

  toggleMember: async (userId: number) => {
    const response = await apiClient.patch(`/api/v1/members/${userId}/toggle`);
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

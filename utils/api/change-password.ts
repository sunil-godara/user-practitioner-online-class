import axios, { AxiosError } from "axios";

export interface ChangePasswordRequestBody {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  token?: string;
}

export async function changePassword(payload: ChangePasswordRequestBody) {
  try {
    const response = await axios.post("/api/auth/change-password", payload);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      ok: false,
      data: err.response?.data || { message: "Something went wrong" },
    };
  }
}
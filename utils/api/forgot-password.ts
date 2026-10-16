import axios, { AxiosError } from "axios";

export interface ForgotPasswordRequestBody {
  email: string;
}

export async function forgotPassword(payload: ForgotPasswordRequestBody) {
  try {
    const response = await axios.post("/api/auth/forgot-password", payload);
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

export interface ResetPasswordRequestBody {
  email: string;
  password: string;
  confirm_password: string;
}

export async function resetPassword(payload: ResetPasswordRequestBody ) {
  try {
    const response = await axios.post("/api/auth/reset-password", payload);
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
export interface VerifyResetTokenRequestBody  {
  token: string;
}

export async function verifyResetToken(payload: VerifyResetTokenRequestBody ) {
  try {
    const response = await axios.post("/api/auth/verify-reset-token", payload);
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

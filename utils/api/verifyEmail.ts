import axios from "axios";

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export async function verifyEmail(payload: VerifyEmailPayload) {
  try {
    const response = await axios.post("/api/auth/verify-email", payload);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      ok: false,
      data: error.response?.data || { message: "Something went wrong" },
    };
  }
}

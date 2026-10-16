import axios from "axios";

export interface ResendEmailPayload {
  email: string;
}

export async function resendEmailVerification(payload: ResendEmailPayload) {
  try {
    const response = await axios.post("/api/auth/resend-email-verification", payload);
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

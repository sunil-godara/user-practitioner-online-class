import axios from "axios";

export interface VerifyPhonePayload {
  phone: string;
  otp: string;
}

export async function verifyPhone(payload: VerifyPhonePayload) {
  try {
    const response = await axios.post("/api/auth/verify-phone", payload);
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

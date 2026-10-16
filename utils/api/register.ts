import axios from "axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  accepted_terms: boolean;
  accepted_privacy_policy: boolean;
  accepted_waiver_agreement: boolean;
  zipCode?: string;
  user_type: "user" | "practitioner";
}

export async function registerUser(payload: RegisterPayload) {
  try {
    const response = await axios.post("/api/auth/register", payload);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        data: error.response.data,
      };
    }
    return {
      ok: false,
      data: { message: "Something went wrong" },
    };
  }
}

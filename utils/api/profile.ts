import axios from "axios";

export interface UpdateProfilePayload {
  name: string;
  zipCode: string;
  company_name?: string;
}

export async function updateUserProfile(payload: UpdateProfilePayload) {
  try {
    const response = await axios.post("/api/profile", payload);
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

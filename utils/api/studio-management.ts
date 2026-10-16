import { StudioDetails } from "@/types";
import axios from "axios";

export const createStudio = async (payload: StudioDetails, token: string) => {
  try {
    const { name, description, location, logoUrl } = payload;

    const response = await axios.post(
      "/api/studio/create",
      { name, description, location, logoUrl },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        data: error.response.data,
      };
    }
    return {};
  }
};

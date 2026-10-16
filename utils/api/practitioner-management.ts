import axios from "axios";
export interface PractitionerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
  user_type: "practitioner";
  practitionerProfile: Record<string, unknown>; // object with any keys, unknown values
  modalities: Record<string, unknown>[]; // array of objects with unknown values
  studios: Record<string, unknown>[]; // array of objects with unknown values
  classes: Record<string, unknown>[]; // array of objects with unknown values
  bookings: Record<string, unknown>[]; // array of objects with unknown values
}

export async function practitionerList(token: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/practitioners/listing`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
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

export const getPractitionerDetails = async (id: string, token: string) => {
  try {
    const payload = { id };

    const response = await axios.post("/api/practitioner/details", payload, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

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

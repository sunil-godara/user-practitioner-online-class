import axios from "axios";

export interface Modality {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
interface PractitionerProfilePayload {
  userId: string;
  bio: string;
  certifications: string;
  stripeConnectId: string;
  commissionRate: number;
  modalityIds: string[];
}

interface ModalityApiResponse {
  message: string;
  status: boolean;
  data: Modality;
}

export const getModalityList = async (token: string): Promise<Modality[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/modality`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data.status) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};

export const getModalityDetailById = async (
  id: string,
  token: string
): Promise<Modality | null> => {
  try {
    const payload = { id };

    const response = await axios.post<ModalityApiResponse>(
      "/api/modality/details",
      payload,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data.status) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error("API error (getModalityDetailById):", err);
    return null;
  }
};

export const savePractitionerProfile = async (
  token: string,
  payload: PractitionerProfilePayload
): Promise<boolean> => {
  try {
    const response = await axios.post(
      "/api/practitioner/save-profile",
      payload,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return response.status === 200 && response.data?.status === true;
  } catch (err) {
    console.error("API error (savePractitionerProfile):", err);
    return false;
  }
};

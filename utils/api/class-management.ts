import axios from "axios";

interface Practitioner {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface Studio {
  id: string;
  name: string;
  location: string;
  approvalStatus?: string;
  creator?: Practitioner;
}

interface Room {
  id: string;
  name: string;
  capacity: number;
}

interface Modality {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string;
}

export interface ClassItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  price: string;
  practitioner: Practitioner;
  studio: Studio;
  room: Room;
  modalities: Modality[];
  availableSpots?: number;
  classModalities?: {
    id: string;
    modality: Modality;
  }[];
}

interface ClassesApiResponse {
  message: string;
  status: boolean;
  data: ClassItem[];
  count?: number;
  timestamp?: string;
}

export interface ClassDetail {
  id: string;
  practitionerId: string;
  studioId: string;
  roomId: string;
  title: string;
  description: string;
  tags: string;
  location: string;
  dateTime: string;
  durationMins: number;
  capacity: number;
  price: string;
  resourceLinks: string;
  approvalStatus: string;
  commissionRateOverride: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  practitioner: Practitioner;
  studio: Studio;
  room: Room;
  classModalities: {
    id: string;
    classId: string;
    modalityId: string;
    createdAt: string;
    updatedAt: string;
    modality: Modality;
  }[];
  modalities: Modality[];
}

interface ClassDetailApiResponse {
  message: string;
  status: boolean;
  data: ClassDetail;
}

export const getClassListing = async (token: string): Promise<ClassItem[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/class/listing`,
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

export const getRecommendedClassesList = async (
  token: string
): Promise<ClassItem[]> => {
  try {
    const response = await axios.get<ClassesApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/class/recommended`,
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

export const getUpcomingClassesList = async (
  token: string
): Promise<ClassItem[]> => {
  try {
    const response = await axios.get<ClassesApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/class/upcoming`,
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

export const getClassDetailById = async (
  classId: string,
  token: string
): Promise<ClassDetail | null> => {
  try {
    const payload = { classId };

    const response = await axios.post<ClassDetailApiResponse>(
      "/api/class/details",
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
    console.error("API error:", err);
    return null;
  }
};

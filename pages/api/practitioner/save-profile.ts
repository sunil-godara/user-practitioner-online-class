import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import axios from "axios";

interface SaveProfilePayload {
  userId: string;
  bio: string;
  certifications: string[];
  stripeConnectId: string;
  commissionRate: number;
  modalityIds: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: false, message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const {
    userId,
    bio,
    certifications,
    stripeConnectId,
    commissionRate,
    modalityIds,
  }: SaveProfilePayload = req.body;

  if (
    !userId ||
    !bio ||
    typeof commissionRate !== "number" ||
    !Array.isArray(modalityIds)
  ) {
    return res.status(400).json({ status: false, message: "Invalid payload" });
  }

  try {
    const token = session.user.token;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/practitioners/profile`,
      {
        userId,
        bio,
        certifications,
        stripeConnectId,
        commissionRate,
        modalityIds,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error fetching modality detail:",
        err.response?.data || err.message
      );
      const status = err.response?.status ?? 500;
      return res.status(status).json({
        message:
          err.response?.data?.message || "Failed to fetch modality detail",
      });
    } else {
      console.error("Unexpected error:", err);
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
}

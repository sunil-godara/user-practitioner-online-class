import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Missing required parameter: modalityId" });
  }

  try {
    const token = session.user.token;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/modality/detail`,
      { id },
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

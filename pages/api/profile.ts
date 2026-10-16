import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { name, zipCode, company_name } = req.body;

    const token = session.user.token;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update`,
      {
        email: session.user.email,
        name,
        zipCode,
        company_name,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Profile update error:", err.response?.data || err);
      const status = err.response?.status ?? 500;
      return res.status(status).json({
        message: err.response?.data?.message || "Failed to update profile",
      });
    } else {
      console.error("Unexpected error:", err);
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
}

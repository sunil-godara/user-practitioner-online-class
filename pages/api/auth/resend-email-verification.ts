import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/resend-email-verification`,
      {
        email,
      }
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Resend email error:", err.response?.data || err);
      const status = err.response?.status ?? 500;
      return res.status(status).json({
        message:
          err.response?.data?.message || "Failed to resend email verification",
      });
    } else {
      console.error("Unexpected error:", err);
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
}

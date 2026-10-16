import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, otp } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/verify-email`,
      {
        email,
        otp,
      }
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Verify email error:", err.response?.data || err);
      const status = err.response?.status ?? 500;
      return res.status(status).json({
        message: err.response?.data?.message || "Verification failed",
      });
    } else {
      console.error("Unexpected error:", err);
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
}

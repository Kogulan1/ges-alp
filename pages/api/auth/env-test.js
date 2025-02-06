export default function handler(req, res) {
    res.status(200).json({
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not Found",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "Not Found",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "Not Found",
    });
  }
  
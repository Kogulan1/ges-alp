import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const clinics = await prisma.clinic.findMany({
        include: { doctors: true, patients: true },
      });
      res.status(200).json(clinics);
    } catch (error) {
      res.status(500).json({ error: "Error fetching clinics" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

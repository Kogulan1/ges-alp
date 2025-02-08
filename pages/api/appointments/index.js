import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { clinicId } = req.query;
      if (!clinicId) return res.status(400).json({ error: "Clinic ID is required" });

      const appointments = await prisma.appointment.findMany({
        where: { doctor: { clinicId } },
        include: { patient: true, doctor: true },
      });

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

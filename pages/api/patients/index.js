import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { clinicId } = req.query;

  if (req.method === "GET") {
    try {
      const patients = await prisma.patient.findMany({
        where: { clinicId },
        include: { appointments: true },
      });
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: "Error fetching patients" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

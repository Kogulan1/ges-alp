import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const doctors = await prisma.doctor.findMany({
        include: { clinic: true }, // Include clinic details
      });
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: "Error fetching doctors" });
    }
  } else if (req.method === "POST") {
    const { name, specialty, clinicId } = req.body;
    try {
      const newDoctor = await prisma.doctor.create({
        data: { name, specialty, clinicId },
      });
      res.status(201).json(newDoctor);
    } catch (error) {
      res.status(500).json({ error: "Error adding doctor" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

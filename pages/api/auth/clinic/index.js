import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all clinics
    const clinics = await prisma.clinic.findMany({
      include: { doctors: true },
    });
    return res.status(200).json(clinics);
  }

  if (req.method === "POST") {
    // Create a new clinic
    const { name, address, phone } = req.body;
    const clinic = await prisma.clinic.create({
      data: { name, address, phone },
    });
    return res.status(201).json(clinic);
  }

  res.status(405).json({ message: "Method not allowed" });
}

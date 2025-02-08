import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all doctors
    const doctors = await prisma.doctor.findMany({
      include: { clinic: true },
    });
    return res.status(200).json(doctors);
  }

  if (req.method === "POST") {
    // Create a new doctor
    const { name, specialty, phone, email, clinicId } = req.body;
    const doctor = await prisma.doctor.create({
      data: { name, specialty, phone, email, clinicId },
    });
    return res.status(201).json(doctor);
  }

  res.status(405).json({ message: "Method not allowed" });
}

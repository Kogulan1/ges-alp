import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all patients
    const patients = await prisma.patient.findMany();
    return res.status(200).json(patients);
  }

  if (req.method === "POST") {
    // Create a new patient
    const { name, email, phone } = req.body;
    const patient = await prisma.patient.create({
      data: { name, email, phone },
    });
    return res.status(201).json(patient);
  }

  res.status(405).json({ message: "Method not allowed" });
}

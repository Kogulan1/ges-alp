import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all appointments
    const appointments = await prisma.appointment.findMany({
      include: { doctor: true, patient: true },
    });
    return res.status(200).json(appointments);
  }

  if (req.method === "POST") {
    // Create an appointment
    const { reason, date, doctorId, patientId } = req.body;
    const appointment = await prisma.appointment.create({
      data: { reason, date: new Date(date), doctorId, patientId },
    });
    return res.status(201).json(appointment);
  }

  res.status(405).json({ message: "Method not allowed" });
}

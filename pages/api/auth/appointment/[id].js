import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Fetch a single appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, doctor: true },
    });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    return res.status(200).json(appointment);
  }

  if (req.method === "PUT") {
    // Update appointment details
    const { status, scheduledAt, reason } = req.body;
    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: { status, scheduledAt, reason },
      });
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      return res.status(400).json({ error: "Error updating appointment" });
    }
  }

  if (req.method === "DELETE") {
    // Delete an appointment
    await prisma.appointment.delete({ where: { id } });
    return res.status(200).json({ message: "Appointment deleted successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Fetch a single doctor
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: { clinic: true, appointments: true },
    });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    return res.status(200).json(doctor);
  }

  if (req.method === "PUT") {
    // Update doctor details
    const { name, specialty, availability } = req.body;
    try {
      const updatedDoctor = await prisma.doctor.update({
        where: { id },
        data: { name, specialty, availability },
      });
      return res.status(200).json(updatedDoctor);
    } catch (error) {
      return res.status(400).json({ error: "Error updating doctor" });
    }
  }

  if (req.method === "DELETE") {
    // Delete a doctor
    await prisma.doctor.delete({ where: { id } });
    return res.status(200).json({ message: "Doctor deleted successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

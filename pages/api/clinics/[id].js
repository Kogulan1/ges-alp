import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Fetch a single clinic
    const clinic = await prisma.clinic.findUnique({
      where: { id },
      include: { doctors: true }, // Include doctors in response
    });
    if (!clinic) return res.status(404).json({ error: "Clinic not found" });
    return res.status(200).json(clinic);
  }

  if (req.method === "PUT") {
    // Update clinic details
    const { name, address, phone, location } = req.body;
    try {
      const updatedClinic = await prisma.clinic.update({
        where: { id },
        data: { name, address, phone, location },
      });
      return res.status(200).json(updatedClinic);
    } catch (error) {
      return res.status(400).json({ error: "Error updating clinic" });
    }
  }

  if (req.method === "DELETE") {
    // Delete a clinic
    await prisma.clinic.delete({ where: { id } });
    return res.status(200).json({ message: "Clinic deleted successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

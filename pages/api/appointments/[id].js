import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { status } = req.body;

      if (!status) return res.status(400).json({ error: "Status is required" });

      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: { status },
      });

      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update appointment status" });
    }
  }
}

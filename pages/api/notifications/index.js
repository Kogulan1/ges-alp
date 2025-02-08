import { PrismaClient } from "@prisma/client";
import axios from "axios"; // Use a Twilio/WhatsApp API

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { patientId, type, message } = req.body;

      // Fetch patient details
      const patient = await prisma.patient.findUnique({ where: { id: patientId } });

      if (!patient) return res.status(404).json({ error: "Patient not found" });

      // Send WhatsApp or SMS
      await axios.post("https://api.whatsapp.com/send", {
        phone: patient.phone,
        message: message,
      });

      // Store notification in DB
      await prisma.notification.create({
        data: { patientId, type, message },
      });

      res.status(200).json({ message: "Notification sent" });
    } catch (error) {
      res.status(500).json({ error: "Error sending notification" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

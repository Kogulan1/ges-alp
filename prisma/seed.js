const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Clinics
  const clinic1 = await prisma.clinic.create({
    data: {
      name: "City Health Clinic",
      address: "123 Main Street, Zurich",
      phone: "+41 22 123 4567",
      location: "Zurich, Switzerland",
    },
  });

  const clinic2 = await prisma.clinic.create({
    data: {
      name: "Alpine Medical Center",
      address: "456 Alpine Road, Geneva",
      phone: "+41 44 987 6543",
      location: "Geneva, Switzerland",
    },
  });

  // Create Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Anna Müller",
      specialty: "Cardiology",
      clinicId: clinic1.id,
      availability: "Mon-Fri 9AM - 5PM",
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Johan Schmidt",
      specialty: "Dermatology",
      clinicId: clinic2.id,
      availability: "Tue-Sat 10AM - 6PM",
    },
  });

  // Create Patients
  const patient1 = await prisma.patient.create({
    data: {
      name: "Alice Brown",
      phone: "+41 76 987 6543",
      email: "alice.brown@example.com",
    },
  });

  // Create Appointments
  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      status: "Confirmed",
      scheduledAt: new Date("2025-02-10T10:00:00Z"),
      reason: "Routine Heart Checkup",
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => console.error("Error seeding database:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  console.log("🌱 Seeding database...");

  // Create Clinic
  const clinic = await prisma.clinic.create({
    data: {
      name: "City Health Clinic",
      location: "123 Main Street, Zurich",
    },
  });

  console.log(`✅ Created Clinic: ${clinic.name}`);

  // Create Doctors for the Clinic
  const doctor1 = await prisma.doctor.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      specialty: "General Practitioner",
      clinicId: clinic.id,
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      firstName: "Emily",
      lastName: "Smith",
      specialty: "Dermatologist",
      clinicId: clinic.id,
    },
  });

  const doctor3 = await prisma.doctor.create({
    data: {
      firstName: "David",
      lastName: "Brown",
      specialty: "Cardiologist",
      clinicId: clinic.id,
    },
  });

  console.log(`✅ Added Doctors: ${doctor1.firstName}, ${doctor2.firstName}, ${doctor3.firstName}`);

  // Create Some Patients
  const patient1 = await prisma.patient.create({
    data: {
      firstName: "Alice",
      lastName: "Johnson",
      phone: "+41 78 123 4567",
      email: "alice@example.com",
      dob: new Date("1990-05-20"),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      firstName: "Bob",
      lastName: "Williams",
      phone: "+41 79 987 6543",
      email: "bob@example.com",
      dob: new Date("1985-09-15"),
    },
  });

  console.log(`✅ Added Patients: ${patient1.firstName}, ${patient2.firstName}`);

  // Create Some Appointments
  const appointment1 = await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      status: "Confirmed",
      scheduledAt: new Date("2025-02-10T10:00:00Z"),
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      status: "Pending",
      scheduledAt: new Date("2025-02-11T14:30:00Z"),
    },
  });

  console.log(`✅ Created Appointments for ${patient1.firstName} and ${patient2.firstName}`);

  // Hash Passwords for Users
  const hashedPasswordAdmin = await bcrypt.hash("admin123", 10);
  const hashedPasswordDoctor = await bcrypt.hash("doctor123", 10);
  const hashedPasswordReceptionist = await bcrypt.hash("reception123", 10);

  // Create Users (Admin, Doctor, Receptionist)
  const adminUser = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@cityclinic.com",
      password: hashedPasswordAdmin, // Store hashed password
      clinicId: clinic.id,
    },
  });

  const doctorUser = await prisma.user.create({
    data: {
      firstName: "Dr. Sarah",
      lastName: "Miller",
      email: "doctor@cityclinic.com",
      password: hashedPasswordDoctor,
      clinicId: clinic.id,
    },
  });

  const receptionistUser = await prisma.user.create({
    data: {
      firstName: "Reception",
      lastName: "Clerk",
      email: "reception@cityclinic.com",
      password: hashedPasswordReceptionist,
      clinicId: clinic.id,
    },
  });

  console.log(`✅ Created Users: ${adminUser.email}, ${doctorUser.email}, ${receptionistUser.email}`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

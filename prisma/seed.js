const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create Clinic
  const clinic = await prisma.clinic.create({
    data: {
      name: "HealthPlus",
      address: "456 Wellness Ave",
      phone_number: "+1-555-987-6543",
      email: "contact@healthplus.com"
    }
  });

  // Create Services
  await prisma.service.createMany({
    data: [
      { name: "General Checkup", description: "Routine health examination" },
      { name: "Pediatric Care", description: "Child healthcare services" },
      { name: "Physical Therapy", description: "Rehabilitation services" }
    ]
  });

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
      email: "admin@healthplus.com",
      clinic_id: clinic.id
    }
  });

  // Create Doctor User with nested doctor
  const doctorPassword = await bcrypt.hash('doctor123', 10);
  const doctorUser = await prisma.user.create({
    data: {
      username: "dr_jones",
      password: doctorPassword,
      role: "DOCTOR",
      email: "jones@healthplus.com",
      clinic_id: clinic.id,
      doctor: {
        create: {
          specialization: "Pediatrics",
          clinic_id: clinic.id
        }
      }
    },
    include: { doctor: true } // Include the doctor relation
  });

  // Create Patient User with nested patient
  const patientPassword = await bcrypt.hash('patient123', 10);
  const patientUser = await prisma.user.create({
    data: {
      username: "mary_smith",
      password: patientPassword,
      role: "PATIENT",
      email: "mary@example.com",
      clinic_id: clinic.id,
      patient: {
        create: {
          medical_history: "Penicillin allergy",
          clinic_id: clinic.id
        }
      }
    },
    include: { patient: true } // Include the patient relation
  });

  // Create Appointment using explicit IDs
  await prisma.appointment.create({
    data: {
      appointment_time: new Date("2024-03-25T10:00:00Z"),
      status: "CONFIRMED",
      patient_id: patientUser.patient.id,
      doctor_id: doctorUser.doctor.id,
      clinic_id: clinic.id
    }
  });

  // Assign Services
  await prisma.userServices.createMany({
    data: [
      { user_id: doctorUser.id, service_id: 1 },
      { user_id: doctorUser.id, service_id: 2 }
    ]
  });

  // Create Notification
  await prisma.notification.create({
    data: {
      user_id: patientUser.id,
      type: "APPOINTMENT_REMINDER",
      message: "Your appointment is in 3 days",
      status: "UNREAD"
    }
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
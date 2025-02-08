import React, { useState, useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../components/Layout/ScrollAnimationWrapper";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (session) fetchAppointments();
  }, [session]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`/api/appointments?clinicId=${session.user.clinicId}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchAppointments(); // Refresh appointments after update
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Access Denied. Please{" "}
          <a href="/auth/login" className="text-blue-500 underline">
            Sign In
          </a>
        </p>
      </div>
    );

  return (
    <div className="xl:px-16 mx-auto">
      <ScrollAnimationWrapper>
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-6 sm:py-12" variants={scrollAnimation}>
          {/* Sidebar */}
          <div className="bg-white shadow-md p-6 rounded-lg flex flex-col col-span-1">
            <div className="flex items-center space-x-3">
              <Image
                src={session.user.image || "/assets/doctor-avatar.png"}
                width={60}
                height={60}
                alt="User Avatar"
                className="rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">{session.user.name}</h2>
                <p className="text-sm text-gray-500">Clinic Admin</p>
              </div>
            </div>

            <nav className="mt-6 space-y-3">
              <a href="#" className="block p-2 text-blue-600 font-bold">Dashboard</a>
              <a href="#" className="block p-2 text-gray-600">Appointments</a>
              <a href="#" className="block p-2 text-gray-600">Patients</a>
              <a href="#" className="block p-2 text-gray-600">Settings</a>
            </nav>

            <button
              className="mt-auto p-3 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="col-span-3">
            <h1 className="text-3xl font-bold mb-6">Appointments</h1>

            {/* Appointment List */}
            <motion.div className="bg-white p-4 rounded-lg shadow" variants={scrollAnimation}>
              <h3 className="text-lg font-bold mb-3">Upcoming Appointments</h3>
              <ul className="mt-3 divide-y">
                {appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <li key={appt.id} className="flex justify-between items-center p-3">
                      <div>
                        <p className="font-semibold">{appt.patient.firstName} {appt.patient.lastName}</p>
                        <p className="text-gray-500 text-sm">{new Date(appt.scheduledAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <select
                          className="p-2 border rounded-md text-gray-700"
                          value={appt.status}
                          onChange={(e) => updateAppointmentStatus(appt.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No appointments available.</p>
                )}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Dashboard;

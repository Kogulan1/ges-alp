import React, { useMemo } from "react";
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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
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
  }

  return (
    <div className=" xl:px-16 mx-auto">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 py-6 sm:py-12"
          variants={scrollAnimation}
        >
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
                <p className="text-sm text-gray-500">Doctor | Specialist</p>
              </div>
            </div>

            <nav className="mt-6 space-y-3">
              <a href="#" className="block p-2 text-blue-600 font-bold">
                Dashboard
              </a>
              <a href="#" className="block p-2 text-gray-600">
                Appointments
              </a>
              <a href="#" className="block p-2 text-gray-600">
                Payments
              </a>
              <a href="#" className="block p-2 text-gray-600">
                Settings
              </a>
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
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={scrollAnimation}
            >
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold">Total Patients</h3>
                <p className="text-2xl text-blue-600">2000+</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold">Today's Patients</h3>
                <p className="text-2xl text-green-600">068</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold">Today's Appointments</h3>
                <p className="text-2xl text-orange-600">085</p>
              </div>
            </motion.div>

            {/* Chart + Appointments */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Appointment List */}
              <motion.div
                className="bg-white p-4 rounded-lg shadow"
                variants={scrollAnimation}
              >
                <h3 className="text-lg font-bold">Today's Appointments</h3>
                <ul className="mt-3">
                  <li className="flex justify-between p-2 border-b">
                    <span>John Doe</span> <span>10:00 AM</span>
                  </li>
                  <li className="flex justify-between p-2 border-b">
                    <span>Maria Lopez</span> <span>11:30 AM</span>
                  </li>
                  <li className="flex justify-between p-2">
                    <span>Michael Chen</span> <span>02:00 PM</span>
                  </li>
                </ul>
              </motion.div>

              {/* Next Patient */}
              <motion.div
                className="bg-white p-4 rounded-lg shadow"
                variants={scrollAnimation}
              >
                <h3 className="text-lg font-bold">Next Patient</h3>
                <div className="flex items-center mt-3">
                  <Image
                    src="/assets/patient-avatar.png"
                    width={50}
                    height={50}
                    alt="Patient"
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-bold">Jane Smith</p>
                    <p className="text-gray-500 text-sm">Checkup at 12:30 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Dashboard;

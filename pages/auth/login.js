import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "../../components/misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../components/Layout/ScrollAnimationWrapper";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter();

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start">
            {/* Clickable Logo - Redirects to Home */}
            <Image
              src="/assets/logo.png" // Replace with actual logo path
              alt="GES ALP Logo"
              width={150}
              height={50}
              className="cursor-pointer mb-6"
              onClick={() => router.push("/")}
            />

            <h1 className="text-3xl lg:text-4xl font-medium text-black-600 leading-normal">
              Sign In to Your Account
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Access your appointments, manage your schedule, and connect with healthcare providers easily.
            </p>

            {/* Google Sign-In Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex justify-center items-center p-3 border border-gray-300 rounded-md mb-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <Image src="/assets/google-icon.png" width={20} height={20} alt="Google" />
              <span className="ml-2 text-gray-700">Sign in with Google</span>
            </button>

            {/* Standard Sign-In Form */}
            <form className="w-full">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <ButtonPrimary>Sign In</ButtonPrimary>
            </form>

            <p className="mt-4 text-black-500">
              Don't have an account?{" "}
              <Link href="/auth/signup">
                <a className="text-orange-500 font-semibold">Sign Up</a>
              </Link>
            </p>
          </div>

          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/assets/Illustration2.png"
                alt="Sign In Illustration"
                quality={100}
                width={600}
                height={400}
                layout="responsive"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default SignIn;

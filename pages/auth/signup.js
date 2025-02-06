import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "../../components/misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../components/Layout/ScrollAnimationWrapper";
import Link from "next/link";

const SignUp = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl lg:text-4xl font-medium text-black-600 leading-normal">
              Create Your Account
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Join GES ALP and experience seamless AI-powered clinic scheduling.
            </p>
            <form className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
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
              <ButtonPrimary>Sign Up</ButtonPrimary>
            </form>
            <p className="mt-4 text-black-500">
              Already have an account?{" "}
              <Link href="/auth/login">
                <a className="text-orange-500 font-semibold">Sign In</a>
              </Link>
            </p>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
            <div className="relative w-full h-auto">
            <Image
                src="/assets/Illustration3.png"
                alt="Sign Up Illustration"
                quality={100}
                width={600}
                height={400}
                className="w-full h-auto object-contain"
                />

                </div>
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default SignUp;

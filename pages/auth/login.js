import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result.error) setError(result.error);
    else router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 shadow-md bg-white rounded-lg">
      {/* Logo */}
      <Image
        src="/assets/Logo.svg"
        alt="GES ALP Logo"
        width={120}
        height={40}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />

      <h1 className="text-2xl font-semibold text-center my-4">Sign In</h1>

      {/* Google Sign-In Button */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full p-3 bg-white border flex items-center justify-center shadow-sm mb-4 hover:shadow-md"
      >
        <Image src="/assets/google-icon.png" width={20} height={20} alt="Google" />
        <span className="ml-2">Sign in with Google</span>
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      {/* Email & Password Login Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;

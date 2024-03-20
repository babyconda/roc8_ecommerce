"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Verify from "../_components/OtpInput";
import toast from "react-hot-toast";
import Spinner from "../_components/Spinner";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyOTP, setVerifyOTP] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call your signup API here
    try {
      setLoading(true);
      const response = await axios.post("api/users/send-email", user);
      toast.success(response.data.message);
      setVerifyEmail(response.data.email);
      setVerifyOTP(response.data.OTP);

      // Show verify OTP Input
      setShowOtpInput(true);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (otp: string) => {
    if (verifyOTP == otp && verifyEmail == user.email) {
      try {
        setLoading(true);
        const response = await axios.post("api/users/signup", user);
        toast.success(response.data.message);
        router.push("/login");
      } catch (error: any) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("OTP does not Match");
    }
  };

  return (
    <>
      {!showOtpInput ? (
        <main className="my-8 flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-xl border-2 border-gray-300 px-6 sm:px-12 py-8">
            {/* <h1 className="text-center text-2xl font-bold">
              {loading ? "Loading....." : "Create your account"}
            </h1> */}
            <h1 className=" text-2xl flex justify-center items-center font-bold">
              {loading ? <Spinner /> : "Create your account"}
            </h1>
            <form onSubmit={handleSignup}>
              <div className="flex flex-col text-sm">
                <label className="mt-6">Name</label>
                <input
                  className="rounded-md border border-gray-300 p-2 "
                  type="text"
                  placeholder="Enter Name"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  required
                />
                <label className="mt-6">Email</label>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="email"
                  placeholder="Enter Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
                <label className="mt-6">Password</label>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="password"
                  placeholder="Enter Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                className="my-8 w-full rounded-md bg-black p-2 text-sm text-white"
                type="submit"
              >
                Create Account
              </button>
            </form>
            <p className="mb-6 text-center text-xs text-gray-500">
              Have an Account?
              <Link
                href="/login"
                className="mx-2 font-semibold text-black hover:underline"
              >
                LOGIN
              </Link>
            </p>
          </div>
        </main>
      ) : (
        <>
          <Verify length={8} email={user.email} onOtpSubmit={onOtpSubmit} />
        </>
      )}
    </>
  );
}

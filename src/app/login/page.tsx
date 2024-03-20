"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "../_components/Spinner";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call your login API here
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      toast.success(response.data.message);
      router.push("/categories");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="my-8 flex justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-xl border-2 border-gray-300 px-6 sm:px-12 py-8">
        <h1 className=" text-2xl flex justify-center items-center font-bold">
          {loading ? <Spinner /> : "Login"}
        </h1>

        <h2 className="text-md mt-6 text-center font-semibold">
          Welcome back to ECOMMERCE
        </h2>

        <p className="mt-1 text-center text-xs">
          The next business marketplace
        </p>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col text-sm">
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
            <div className="border">
              <input
                className="rounded-md w-full  border-gray-300 p-2"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
              <span
                className="absolute mt-1 -ml-16 cursor-pointer underline px-3 py-1 hover:bg-slate-200 rounded-md"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            className="my-8 w-full rounded-md bg-black p-2 text-sm text-white"
            type="submit"
          >
            LogIn
          </button>
        </form>

        <div className="my-2 border-t border-gray-300"></div>

        <p className="my-4 text-center text-xs text-gray-500">
          Don&#39;t have an Account?
          <Link
            href="/signup"
            className="mx-1 font-semibold text-black hover:underline"
          >
            SIGN UP
          </Link>
        </p>
      </div>
    </main>
  );
}

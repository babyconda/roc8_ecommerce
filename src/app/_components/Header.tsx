"use client";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const currentPage = usePathname();

  const [name, setName] = useState("");

  const logouthandle = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserName = async () => {
    const res = await axios.get("api/users/user-details");
    setName(res.data.data.username);
  };

  useEffect(() => {
    if (currentPage === "/categories") {
      getUserName();
    }
    if (currentPage !== "/categories") {
      setName("");
    }
  }, [currentPage]);

  return (
    <nav>
      <div className="px-8 py-2">
        <ul className="flex justify-end gap-5 text-sm text-gray-400">
          <li>Help</li>
          <li>Order & Returns</li>
          <li>Hi, {name ? name : "Welcome"}</li>
          {name && (
            <li>
              <button
                className="border px-2 rounded-md text-black hover:bg-slate-100 hover:text-gray-900"
                onClick={logouthandle}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-baseline justify-between px-8 py-2">
        <h1 className="text-3xl font-bold">ECOMMERCE</h1>
        <ul className="hidden gap-8 font-semibold md:-ml-32 lg:flex">
          <li>Categories</li>
          <li>Sale</li>
          <li>Clearance</li>
          <li>New stock</li>
          <li>Trending</li>
        </ul>

        <ul className="flex gap-8 text-xl">
          <li>
            <CiSearch />
          </li>
          <li>
            <FiShoppingCart />
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-center gap-6 bg-gray-200 py-2 text-sm font-semibold">
        <FaChevronLeft />
        <p>Get 10% off on business sign up</p>
        <FaChevronRight />
      </div>
    </nav>
  );
}

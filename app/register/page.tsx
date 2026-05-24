"use client";
import Link from "next/link";
import { TOKO_URL } from "@/global";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type responseRegister = {
  status: boolean;
  message: string;
  token?: string;
  role?: string;
};

const RegisterPage = () => {
  const [password, usepassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setrole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${TOKO_URL}/auth/register`;
    const payload = JSON.stringify({ password, role, name, email });
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log(data);
      if (data.success) {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastRegister`,
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => router.replace("/login"), 1000);
      } else {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastRegister`,
          type: "warning",
        });
      }
    } catch (error) {
      toast("Nulis apa kao", {
        hideProgressBar: true,
        containerId: `toastRegister`,
        type: "warning",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer containerId={`toastRegister`} />
      <div className="w-3/6 p-8  rounded shadow-md ">
        <h1 className="text-2xl font-bold mb-4 ">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="Name"
              name="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <input
              onChange={(e) => setrole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="role"
              name="role"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => usepassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="email"
              name="email"
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className=" mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

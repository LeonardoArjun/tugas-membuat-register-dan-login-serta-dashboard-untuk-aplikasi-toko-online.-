"use client";
import Link from "next/link";
import { TOKO_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type responseLogin = {
  success: boolean;
  message: string;
  token?: string;
  role?: string;
};
const LoginPage = () => {
  const [email, setemail] = useState<string>("");
  const [password, usepassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${TOKO_URL}/auth/login`;
      const payload = JSON.stringify({ email: email, password });
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: responseLogin = response.data;
      if (data.success == true) {
        let role = data.role;
        if (role === `user`) {
          toast(data.message, {
            hideProgressBar: true,
            containerId: `toastLogin`,
            type: "success",
            autoClose: 2000,
          });
          storeCookie("token", data?.token || "");
          storeCookie("role", data?.role || "");
          setTimeout(() => router.replace(`/user/dashboard`), 1000);
        } else {
          toast("Lo bukan Siapa", {
            hideProgressBar: true,
            containerId: `toastLogin`,
            type: "warning",
            autoClose: 2000,
          });
        }
      } else
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "warning",
        });
    } catch (error) {
      console.log(error);
      toast(
        `Ikan itu salah
        `,
        {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "error",
        },
      );
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer containerId={`toastLogin`} />
      <div className="w-3/6 p-8 bg-white rounded shadow-md ">
        <h1 className="text-2xl font-bold mb-4 ">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              onChange={(e) => usepassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;

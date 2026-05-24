"use client";
import Link from "next/link";
import { TOKO_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type responseLogin = {
  status: boolean;
  message: string;
  token?: string;
  user?: {
    role?: string;
  };
};
const LoginPage = () => {
  const [email, setemail] = useState<string>("");
  const [password, usepassword] = useState<string>("");
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
      if (data.status == true) {
        let role = data.user?.role;
        if (role === "user") {
          toast(data.message, {
            hideProgressBar: true,
            containerId: `toastLogin`,
            type: "success",
            autoClose: 2000,
          });
          storeCookie("token", data?.token || "");
          storeCookie("role", data?.user?.role || "");
          setTimeout(() => router.replace("/user/dashboard"), 1000);
        } else if (role === "admin") {
          toast(data.message, {
            hideProgressBar: true,
            containerId: `toastLogin`,
            type: "success",
            autoClose: 2000,
          });
          storeCookie("token", data?.token || "");
          storeCookie("role", data?.user?.role || "");
          setTimeout(() => router.replace("/admin/dashboard"), 1000);
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
    <div className="flex w-screen min-h-screen bg-slate-50 font-sans">
      <div className="hidden md:flex w-1/2 bg-linear-to-tr from-indigo-600 to-violet-500 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-2xl -top-20 -left-20"></div>
        <div className="absolute w-80 h-80 rounded-full bg-indigo-400/30 blur-xl bottom-10 right-10"></div>

        <div className="relative z-10 text-white max-w-md text-center md:text-left">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Selamat Datang Kembali!
          </h2>
          <p className="text-indigo-100 text-lg font-light leading-relaxed">
            Silakan masuk ke akun Anda untuk mengakses dashboard dan mengelola
            semua aktivitas Anda dengan mudah.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <ToastContainer containerId={`toastLogin`} />

        <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Login
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Masuk untuk melanjutkan ke aplikasi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
                type="email"
                id="email"
                name="email"
                placeholder="nama@email.com"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-sm font-semibold text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Lupa Password?
                </a>
              </div>
              <input
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder-••••••••"
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={(e) => usepassword(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-600"
              >
                Ingat saya
              </label>
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-[0.98]"
              type="submit"
            >
              Masuk Sekarang
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Belum punya akun?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Daftar gratis
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

{
  /* <div className=" flex w-screen min-h-screen bg-gray-100">
      <div className="w-1/2 bg-amber-400">
        <div className="w-80 rounded-full h-80 bg-red-600 ~"></div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <ToastContainer containerId={`toastLogin`} />
        <div className="w-3/6 p-8  rounded shadow-md ">
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
    </div> */
}

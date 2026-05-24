"use client";

import Modal from "@/componen/modal";
import { AddBarang } from "@/services/barang";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TOKO_URL } from "@/global";
type PropsAddBarang = {
  id?: number | undefined;
  formData?: any;
  label: string;
  className: string;
};
const FormAddService = ({ id, formData, label, className }: PropsAddBarang) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nama_barang, setNamaBarang] = useState<string>(
    formData?.nama_barang || "",
  );
  const [deskripsi, setDeskripsi] = useState<string>(formData?.deskripsi || "");
  const [stok, setStok] = useState<number>(formData?.stok || 0);
  const [harga, setHarga] = useState<number>(formData?.harga || 0);
  const [image, setImage] = useState<File | string>(formData?.image || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const barangData = {
      nama_barang,
      deskripsi,
      stok,
      harga,
      image,
    };
    const response = await AddBarang(id, barangData);
    if (response.status) {
      toast(response.message, {
        hideProgressBar: true,
        containerId: `toastLogin`,
        type: "success",
        autoClose: 2000,
      });
      router.refresh();
      setIsOpen(false);
    } else {
      toast(response.message, {
        hideProgressBar: true,
        containerId: `toastLogin`,
        type: "error",
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={`${className}`}>
        {label}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tambah Service"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama barang
            </label>
            <input
              value={nama_barang}
              onChange={(e) => setNamaBarang(e.target.value)}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              value={stok}
              onChange={(e) => setStok(Number(e.target.value))}
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <input
            multiple={true}
            onChange={(e) => setImage(e.target.files?.[0] || "")}
            type="file"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default FormAddService;

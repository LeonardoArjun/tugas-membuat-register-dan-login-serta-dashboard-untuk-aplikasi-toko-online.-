"use client";
import Modal from "@/componen/modal";
import { useState } from "react";
import Image from "next/image";
import { TOKO_URL } from "@/global";
import { URL_IMAGE } from "@/global";

type Props = {
  label: string;
  className: string;
  image: string;
  nama: string;
};
const ViewBarang = ({ label, className, image, nama }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={`${className}`}>
        {label}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tampil Bukti Pembayaran"
      >
        <div className="flex justify-center">
          <img
            className="w-full object-cover"
            src={image ? `${URL_IMAGE}/${image}` : "/img/Pembohonk_public.png"}
            alt={nama}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ViewBarang;

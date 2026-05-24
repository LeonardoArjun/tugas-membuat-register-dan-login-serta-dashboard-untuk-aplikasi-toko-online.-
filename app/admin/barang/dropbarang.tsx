"use client";
import { useRouter } from "next/navigation";
import { DropBarang } from "@/services/barang";

const DropBarangButton = ({ barangId }: { barangId: number }) => {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("Are you sure you want to drop this barang?")) {
      await DropBarang(barangId);
      router.refresh();
    } else {
      alert("Gagal hapus");
    }
  };
  return (
    <div>
      <button
        onClick={() => handleDelete()}
        className="bg-red-500 text-white cursor-pointer hover:bg-red-700 px-2 py-1 rounded"
      >
        Drop
      </button>
    </div>
  );
};
export default DropBarangButton;

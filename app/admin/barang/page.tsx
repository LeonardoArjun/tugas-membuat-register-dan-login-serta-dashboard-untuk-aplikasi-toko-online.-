import { GetBarang } from "@/services/barang";
import FormAddService from "./formadd";
import ViewBarang from "./viewbarang";
import DropBarangButton from "./dropbarang";
const BarangPage = async () => {
  const { data } = await GetBarang();
  console.log(data);

  return (
    <div className=" p-6">
      <h1 className="text-2xl font-bold mb-4"> Barang Customer </h1>
      <p className="mb-4"> Lihat dan Teliti</p>
      <FormAddService
        label="Tambah"
        className=" bg-blue-500 hover:bg-blue-400 p-2 rounded-2xl text-white cursor-pointer"
      />
      <div className=" grid grid-cols-5 gap-4">
        {data &&
          data.map((barang) => (
            <div
              key={barang.id}
              className="border p-4 rounded shadow flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">
                {barang.nama_barang}
              </h2>{" "}
              <p>Deskripsi: {barang.deskripsi}</p>
              <p>stok barang:{barang.stok}</p>
              <p>Harga : {barang.harga}</p>
              <div className="flex flex-col items-center  mt-auto gap-2 ">
                <ViewBarang
                  label="Lihat Bukti"
                  className="bg-green-500 text-white cursor-pointer hover:bg-green-600 px-2 py-1 rounded"
                  image={barang.image}
                  nama={barang.nama_barang}
                />{" "}
                <DropBarangButton barangId={barang.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BarangPage;

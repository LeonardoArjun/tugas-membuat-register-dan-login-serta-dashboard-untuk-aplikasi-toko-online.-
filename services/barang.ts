import axios from "axios";
import { Barang } from "@/types/barang";
import { getServerCookie } from "@/lib/server-cookie";
import { TOKO_URL } from "@/global";

type ResponseData = {
  status: boolean;
  message: string;
  data?: Barang[];
};
export const GetBarang = async (): Promise<ResponseData> => {
  try {
    const token = await getServerCookie("token");
    const response = await axios.get(`${TOKO_URL}/admin/getbarang`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return {
      status: true,
      message: "Services fetched successfully",
      data: data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to fetch services",
    };
  }
};

export const AddBarang = async (
  id: number | undefined,
  barangData: {
    nama_barang: string;
    deskripsi: string;
    stok: number;
    harga: number;
    image: File | string;
  },
): Promise<ResponseData> => {
  try {
    const token = await getServerCookie("token");
    const formData = new FormData();
    formData.append("nama_barang", barangData.nama_barang);
    formData.append("deskripsi", barangData.deskripsi);
    formData.append("stok", String(barangData.stok));
    formData.append("harga", String(barangData.harga));
    if (barangData.image instanceof File) {
      formData.append("image", barangData.image);
    }

    let response;
    if (id === undefined) {
      response = await axios.post(`${TOKO_URL}/admin/insertbarang`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios.patch(
        `${TOKO_URL}/admin/updatebarang/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    }
    const data = response.data;
    return {
      status: true,
      message: "Barang added successfully",
      data: data.data,
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to add barang",
    };
  }
};

export const DropBarang = async (barangId: number): Promise<ResponseData> => {
  try {
    const token = await getServerCookie("token");
    const response = await axios.delete(
      `${TOKO_URL}/admin/hapusbarang/${barangId}`,
      {
        headers: {
          "Content-Type": "application/json",

          authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      status: true,
      message: "Barang deleted successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to delete barang",
    };
  }
};

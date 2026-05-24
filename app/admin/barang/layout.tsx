import AdminSidebar from "@/componen/adminsidebar";

export const metadata = {
  title: "Barang | Toko Online",
  description: "Toko Online",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <AdminSidebar>{children}</AdminSidebar>;
};

export default RootLayout;

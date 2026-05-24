export const metadata = {
  title: "Dashboard | Toko Online",
  description: "Toko Online",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <div> {children}</div>;
};

export default RootLayout;

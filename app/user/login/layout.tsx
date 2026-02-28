export const metadata = {
  title: "Login | Login",
  description: "Toko Online",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <div> {children}</div>;
};

export default RootLayout;

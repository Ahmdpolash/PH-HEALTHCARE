import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Header/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};
export default CommonLayout;

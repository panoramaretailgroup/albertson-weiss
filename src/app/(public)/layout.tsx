import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { OrganizationSchema } from "@/components/JsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-public min-h-screen">
      <OrganizationSchema />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

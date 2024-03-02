// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Header";

import Sidebar from "@/components/shared/Sidebar";


export default function RootLayout({
  children,
}) {
  return (
    <div className=" h-screen flex ">
      {/* <Navbar /> */}

    <Sidebar />
      <main className="flex-1">{children}</main>
      {/* <Footer />- */}
    </div>
  );
}
// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Header";

import Sidebar from "@/components/shared/Sidebar";


export default function RootLayout({
  children,
}) {
  return (
    <div className=" h-screen flex  bg-slate-50 ">
      {/* <Navbar /> */}
        <Sidebar />
        <main className="flex-1 overflow-y-scroll">
        <h2 className=" w-full sticky flex p-4 font-serif bg-white shadow items-center justify-center  text-4xl font-bold text-primary">Games On Comsats</h2>
        {children}
        </main>
      {/* <Footer />- */}
    </div>
  );
}
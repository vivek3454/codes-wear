"use client";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
    return (
        <>
            <style jsx global >{`
        header {
          display: none;
        }
        footer {
          display: none;
        }
        `}</style>
            <section className="md:flex">
                <Sidebar />
                <div className="w-full overflow-y-auto h-[100vh]">
                    {children}
                </div>
            </section>
        </>
    );
}

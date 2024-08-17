import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import React, { ReactNode } from "react";


interface LayoutProps {
    children: ReactNode;
}
const AppShell: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen  max-w-[1440px] px-8 mx-auto">
            <Navbar />
            <main className="flex-grow container mx-auto px-0">{children}</main>
            <Footer />
        </div>
    );
}

export default AppShell;
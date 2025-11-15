// frontend/src/layouts/UserLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/userInterface/Header";
import Footer from "../components/userInterface/footer";

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;

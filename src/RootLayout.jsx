import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Frame from "./components/Frame";

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Frame />
    </>
  );
};

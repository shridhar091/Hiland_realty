import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../pages/Navbar";

const Layout = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
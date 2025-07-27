import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PrivateLayout = () => {
  return (
    <>
      <Navbar />
      <Box mt="120px" px={3}>
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateLayout;

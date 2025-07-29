import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { Divider } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
} from "recharts";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ReportingOpManuals from "./components/ReportingOpManuals";





export default function Reporting() {
  return (
    <Box p={4} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" ,marginX:"auto"}}>
      <Grid container spacing={3}>
        <Grid size={3}>
          <Card sx={{ height: "max-content" }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" fontSize={16} gutterBottom>
                MODULE REPORTING
              </Typography>

              <Divider sx={{ my: 2 }} /> 
              
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                bgcolor="#eeeeee"
                borderRadius={1}
                mb={1}
              >
                <Typography fontSize={15}>Operations Manuals</Typography>
                <ChevronRightIcon fontSize="small" />
              </Box>
              
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                borderRadius={1}
              >
                <Typography fontSize={15}>News</Typography>
                <ChevronRightIcon fontSize="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

       <ReportingOpManuals />
      </Grid>
    </Box>
    
  );
}

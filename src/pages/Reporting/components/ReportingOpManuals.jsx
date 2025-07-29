import React from 'react'
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

const pieData = [{ name: "Compliance", value: 95.06 }];
const COLORS = ["#0D47A1"];

const barData = [
  "Alexandra Hills",
  "Armstrong Creek",
  "Brown Hill",
  "Caboolture",
  "Carindale",
  "Craigieburn (VIC)",
  "East Cannington",
  "Ferny Grove",
  "Goulburn",
  "Jindalee (QLD)",
  "Kenmore",
  "Labrador (QLD)",
  "Lismore",
  "McLaren Vale",
  "Mont Albert North",
  "Nambour (Parklands)",
  "Parkdale",
  "Portarlington (VIC)",
  "Scarborough (QLD)",
  "Sippy Downs (NSW)",
  "Unley",
  "Vermont (VIC)",
  "Yarrawba",
].map((name) => ({ name, value: 95 + Math.random() * 5 }));

const scatterData = new Array(40).fill(0).map((_, i) => ({ x: i, y: 95 + Math.random() * 5 }));
const ReportingOpManuals = () => {
  return (
    <div> <Grid item size={9}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" fontSize={16}>
                OPERATIONS MANUALS
              </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={4} mt={3}>
            <Grid item xs={12} md={4} size={4}>
              <Card>
                <CardContent sx={{ py:2}}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    OVERALL POLICY COMPLIANCE
                  </Typography>
                   <Divider sx={{ my: 2 }} /> 
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        95.06%
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8} size={8}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={0} mt={0}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      POLICY COMPLIANCE (BY LOCATION)
                    </Typography>
                   
                    <IconButton size="small">
                      <FilterAltIcon fontSize="small" />
                    </IconButton>
                  </Box>
                   <Divider sx={{ my: 2 }} /> 
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData} margin={{ top: 10, bottom: 2 }}>
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#0D47A1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                POLICY COMPLIANCE (BY STAFF)
              </Typography>
             <ResponsiveContainer width="100%" height={100}>
  <ScatterChart>
    <XAxis dataKey="x" type="number" hide /> {/* Add this line */}
    <YAxis dataKey="y" domain={[75, 100]} hide />
    <Scatter data={scatterData} fill="#0D47A1" />
  </ScatterChart>
</ResponsiveContainer>

            </CardContent>
          </Card>
        </Grid></div>
  )
}

export default ReportingOpManuals
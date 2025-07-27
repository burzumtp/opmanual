import { Box, Paper, Typography, IconButton, Divider, Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function QuickLinksCard() {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        borderRadius: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Header Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          QUICK LINKS
        </Typography>
        <IconButton size="small" >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Link Grid */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1.5,
              borderRadius: 2,
              border: "1px solid #ddd",
            }}
          >
            <MenuBookIcon sx={{ color: "#d8d80e", fontSize: 40 }} />
            <Typography
              variant="body2"
              sx={{ mt: 1, fontWeight: 500, textAlign: "center" }}
            >
              Operations Manual
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1.5,
              borderRadius: 2,
              border: "1px solid #ddd",
            }}
          >
            <HelpOutlineIcon sx={{ color: "#d8d80e", fontSize: 40 }} />
            <Typography
              variant="body2"
              sx={{ mt: 1, fontWeight: 500, textAlign: "center" }}
            >
              System Help
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default QuickLinksCard;

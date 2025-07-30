import { Outlet } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import NewsCard from "./components/NewsCard";
import RightCard from "./components/RightCard1";
import { httpClient } from "../../utils/httpClientSetup";
import { useEffect, useState } from "react";

function Dashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNews = () => {
    setLoading(true);
    httpClient
      .get("news")
      .then(
        (response) => {
          const data = response.data;
          if (data.success) {
            setNews(data.data);
          }
        },
        (error) => {
          setError(error.response?.data?.message || "failed to fetch news");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <Box
      sx={{
        justifyContent: { xs: "center", md: "center" },
        alignItems: { xs: "center", md: "flex-start", lg: "flex-start" },
        display: "flex",
        backgroundColor: "#FAF7F3",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "70vh",
        px: { xs: 1, sm: 2 },
        padding: 2,
        boxSizing: "border-box",
        gap: { xs: 2, md: 3 },
      }}
    >
      {/* Left spacing fixed at 150px */}
      <Box
        sx={{
          width: "150px",
          display: { xs: "none", md: "block" },
          flexShrink: 0,
        }}
      />

      {/* Center card with flexible width and max width */}
      <Paper
        elevation={3}
        // sx={{
        //   // flexGrow: 1,
        //   flex:1,
        //   // flexBasis: 0,
        //   width: { xs: "100%", md: "60%" },
        //   minWidth: 100,    // minimum reasonable width
        //   maxWidth: "60%",  // max 60% of container width
        //   padding: 2,
        //   marginRight: 2,
        //   borderRadius: 2,
        //   boxSizing: "border-box",
        //   height:"fit-content"
        // }}

        sx={{
          flex: 1,
          width: { xs: "100%", md: "60%" },
          padding: 2,
          borderRadius: 2,
          boxSizing: "border-box",
          height: "fit-content",
        }}
      >
        <NewsCard newsData={news} />
      </Paper>

      {/* Right column with two cards stacked, flexible width */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", md: "25%" },
          // minWidth: 250,
          // maxWidth: 350,
          // flexShrink: 0,
        }}
      >
        <RightCard />
        {/* <Paper elevation={2} sx={{ padding: 2, borderRadius: 2, boxSizing: "border-box" }}>
          <Typography variant="subtitle1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sapiente nostrum impedit nobis laudantium recusandae illum necessitatibus, quos atque? Tenetur illum similique omnis rerum cumque, sapiente, blanditiis molestiae ad tempore eligendi nisi fuga numquam voluptatem est dolorem sit quia nobis minima. Corrupti pariatur nulla odit quis veniam eum at vero?</Typography>
          <Typography variant="body2">Some content here...</Typography>
        </Paper> */}
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: 2,
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <Typography variant="subtitle1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            officiis rem ad vel quibusdam, explicabo tempore illum, quasi odit
            sequi dolor blanditiis obcaecati soluta maxime nisi porro delectus
            maiores impedit dignissimos aliquam deleniti magni vitae optio
            repellat. Officia nam itaque, aperiam quis ex tenetur magnam
            consectetur earum accusantium assumenda numquam!Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Recusandae, officiis rem ad
            vel quibusdam, explicabo tempore illum, quasi odit sequi dolor
            blanditiis obcaecati soluta maxime nisi porro delectus maiores
            impedit dignissimos aliquam deleniti magni vitae optio repellat.
            Officia nam itaque, aperiam quis ex tenetur magnam consectetur earum
            accusantium assumenda numquam
          </Typography>
          <Typography variant="body2">Additional info...</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;

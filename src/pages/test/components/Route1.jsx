import { Box, Paper, Typography, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { httpClient } from "../../../utils/httpClientSetup"; // Your configured httpClient

function Dashboard() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchNews = (page = 1) => {
    setLoading(true);
    httpClient.get("news", {
      // action: "getNews",
      // page: page
    }).then(
      (response) => {
        const data = response.data;
        if (data.success) {
          setNewsData(data.data);
          setPagination({
            currentPage: data.pagination.current_page,
            totalPages: data.pagination.last_page,
          });
        }
      },
      (error) => {
        setError(error.response?.data?.message || "Failed to fetch news");
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handlePageChange = (event, page) => {
    fetchNews(page);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Typography>Loading news...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#FAF7F3",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "70vh",
        p: 2,
        gap: 2,
      }}
    >
      {/* Left spacing */}
      <Box sx={{ width: "150px", display: { xs: "none", md: "block" } }} />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {newsData.map((newsItem) => (
          <Paper key={newsItem.id} elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">{newsItem.title}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {newsItem.content}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {new Date(newsItem.created_at).toLocaleDateString()}
            </Typography>
          </Paper>
        ))}

        {pagination.totalPages > 1 && (
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            sx={{ mt: 2, alignSelf: "center" }}
          />
        )}
      </Box>

      {/* Right sidebar */}
      <Box sx={{ width: { md: "25%" }, display: { xs: "none", md: "block" } }}>
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">Sidebar Content</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
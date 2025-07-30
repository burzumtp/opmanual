import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  IconButton,
  Tooltip,
  Divider,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ArticleForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    video: false,
    featured: false,
    archive: false,
    primaryImage: null,
    attachments: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.grey[100],
        p: isMobile ? 2 : 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 800,
            borderRadius: 2,
            p: isMobile ? 2 : 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="primary"
            sx={{ mb: 3 }}
          >
            {isMobile ? "📰 News Article" : "📰 Create or Edit News Article"}
          </Typography>

          <Stack spacing={3} sx={{ width: "100%" }}>
            {/* Title */}
            <TextField
              fullWidth
              required
              label="Article Title"
              size={isMobile ? "small" : "medium"}
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {/* Content - MD Editor */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Article Content *
              </Typography>
              <Box data-color-mode="light">
                <MDEditor
                  value={formData.content}
                  onChange={(value) => handleChange("content", value)}
                  height={isMobile ? 300 : 400}
                  preview="edit"
                  style={{ borderRadius: theme.shape.borderRadius }}
                />
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Supports markdown formatting
              </Typography>
            </Box>

            {/* Category */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>News Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  input={<OutlinedInput label="News Category" />}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                  <MenuItem value="Support">Support</MenuItem>
                  <MenuItem value="Announcements">Announcements</MenuItem>
                  <MenuItem value="Updates">Updates</MenuItem>
                </Select>
              </FormControl>
              <Button
                startIcon={<AddIcon fontSize={isMobile ? "small" : "medium"} />}
                size={isMobile ? "small" : "medium"}
                onClick={() => console.log("Add category clicked")}
                sx={{ alignSelf: "flex-start" }}
              >
                Add Category
              </Button>
            </Box>

            {/* Switch Toggles */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    size={isMobile ? "small" : "medium"}
                    checked={formData.video}
                    onChange={(e) => handleChange("video", e.target.checked)}
                  />
                }
                label="Video(s)"
              />

              <FormControlLabel
                control={
                  <Switch
                    size={isMobile ? "small" : "medium"}
                    checked={formData.featured}
                    onChange={(e) => handleChange("featured", e.target.checked)}
                  />
                }
                label="Featured Article"
              />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  control={
                    <Switch
                      size={isMobile ? "small" : "medium"}
                      checked={formData.archive}
                      onChange={(e) =>
                        handleChange("archive", e.target.checked)
                      }
                    />
                  }
                  label="Auto Archive"
                />
                <Tooltip title="Archived articles will be hidden after a period.">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* File Uploads */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2">Primary Image</Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  component="label"
                  size={isMobile ? "small" : "medium"}
                  startIcon={
                    <UploadFileIcon fontSize={isMobile ? "small" : "medium"} />
                  }
                >
                  Upload Image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleChange("primaryImage", e.target.files[0])
                    }
                  />
                </Button>
                {formData.primaryImage && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Selected: {formData.primaryImage.name}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2">Attachments</Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  component="label"
                  size={isMobile ? "small" : "medium"}
                  startIcon={
                    <UploadFileIcon fontSize={isMobile ? "small" : "medium"} />
                  }
                >
                  Upload Files
                  <input
                    hidden
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleChange("attachments", e.target.files)
                    }
                  />
                </Button>
                {formData.attachments && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Selected:{" "}
                    {formData.attachments.length > 1
                      ? `${formData.attachments.length} files`
                      : formData.attachments[0].name}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Private URL */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Private Article URL
              </Typography>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: theme.palette.grey[200],
                  borderRadius: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  https://bluewheelers.opcentral.com.au/#/news/article/reference/ENg1mx
                </Typography>
              </Box>
            </Box>

            {/* Submit Buttons */}
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                size={isMobile ? "medium" : "large"}
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                sx={{ borderRadius: 2 }}
                color="primary"
              >
                Submit Article
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ArticleForm;

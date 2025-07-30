// import React from 'react'
// import { Link,Outlet } from 'react-router-dom'
// import SideDocs from './components/SideDocs'
// // import { useParams } from "react-router-dom";
// const ManualsDocs = () => {
//   return (

//     <div>this is operations manuals Docs pages
// <Link to = "policy/1">this is a docs child </Link>
// {/* <SideDocs /> */}
// <Outlet />
//     </div>
//   )
// }

// export default ManualsDocs

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Breadcrumbs,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { httpClient } from "../../utils/httpClientSetup";

const sampleData = [
  {
    id: "1",
    title: "1.0 FRANCHISE OPERATIONS & PROCEDURES MANUAL",
    subsections: [
      {
        id: "1.1",
        title: "1.1 Acknowledgement & Receipt - Franchisor Copy",
        apiId: 1,
      },
      { id: "1.2", title: "1.2 How to Use this Manual", apiId: 2 },
    ],
  },
  {
    id: "2",
    title: "2.0 FRANCHISE OPERATIONS",
    subsections: [
      { id: "2.1", title: "2.1 Vision & Mission", apiId: 3 },
      {
        id: "2.2",
        title: "2.2 Obligations & Responsibilities",
        children: [
          { id: "2.2.1", title: "2.2.1 Blue Wheelers Obligations", apiId: 4 },
          { id: "2.2.2", title: "2.2.2 Points of Contact", apiId: 5 },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "3.0 TRAINING & SUPPORT",
    subsections: [
      { id: "3.1", title: "3.1 Initial Training", apiId: 6 },
      { id: "3.2", title: "3.2 Ongoing Support", apiId: 7 },
    ],
  },
];

const ManualsDocs = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selected, setSelected] = useState(null); // { sectionTitle, subsectionTitle, apiId }
  const [apiContent, setApiContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);

  const fetchSections = () => {
    setLoading(true);

    httpClient
      .get("navigations")
      .then(
        (response) => {
          const data = response.data;
          if (data.success) {
            setSections(data.data);
          }
        },
        (error) => {
          setError(error.response?.data?.message || "failed to load sections");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };
  const handleToggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const handleSelectContent = (sectionTitle, subsectionTitle, apiId) => {
    setSelected({ sectionTitle, subsectionTitle, apiId });
  };

  useEffect(() => {
    fetchSections();
    if (!selected?.apiId) return;

    setLoading(true);
    setApiContent(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${selected.apiId}`)
      .then((res) => res.json())
      .then((data) => {
        setApiContent(data);
      })
      .catch(() => {
        setApiContent({ title: "Error", body: "Could not fetch content." });
      })
      .finally(() => setLoading(false));
  }, [selected]);

  const handlePlay = () => {
    if (apiContent?.title || apiContent?.body) {
      const msg = new SpeechSynthesisUtterance(
        `${apiContent.title}. ${apiContent.body}`
      );
      msg.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <Box display="flex" gap={3} padding={3}>
      {/* Sidebar */}
      <Box width="320px">
        <Typography fontWeight="bold" mb={2}>
          TABLE OF CONTENTS
        </Typography>

        {sampleData.map((section) => (
          <Accordion
            key={section.id}
            expanded={expandedSection === section.id}
            onChange={() => handleToggleSection(section.id)}
            sx={{ backgroundColor: "#f7f7f7" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List disablePadding>
                {section.subsections.map((sub) => (
                  <React.Fragment key={sub.id}>
                    <ListItemButton
                      sx={{
                        pl: 2,
                        backgroundColor:
                          selected?.apiId === sub.apiId ? "#d1eaff" : "inherit",
                        color:
                          selected?.apiId === sub.apiId ? "#0d47a1" : "inherit",
                      }}
                      onClick={() =>
                        sub.apiId &&
                        handleSelectContent(section.title, sub.title, sub.apiId)
                      }
                    >
                      <ListItemText primary={sub.title} />
                    </ListItemButton>
                    {sub.children &&
                      sub.children.map((child) => (
                        <ListItemButton
                          key={child.id}
                          sx={{
                            pl: 4,
                            backgroundColor:
                              selected?.apiId === child.apiId
                                ? "#d1eaff"
                                : "inherit",
                            color:
                              selected?.apiId === child.apiId
                                ? "#0d47a1"
                                : "inherit",
                          }}
                          onClick={() =>
                            child.apiId &&
                            handleSelectContent(
                              section.title,
                              child.title,
                              child.apiId
                            )
                          }
                        >
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      ))}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Right panel */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          minHeight: "300px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top breadcrumb & speech bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={1}
          bgcolor="#f0f0f0"
          borderBottom="1px solid #ddd"
        >
          <Breadcrumbs aria-label="breadcrumb">
            {selected?.sectionTitle && (
              <Typography color="inherit">{selected.sectionTitle}</Typography>
            )}
            {selected?.subsectionTitle && (
              <Typography color="text.primary">
                {selected.subsectionTitle}
              </Typography>
            )}
          </Breadcrumbs>

          {/* Play & Pause buttons */}
          {apiContent && (
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handlePlay}
                disabled={isSpeaking}
              >
                Play
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handlePause}
                disabled={!isSpeaking}
              >
                Pause
              </Button>
            </Box>
          )}
        </Box>

        {/* Content Area */}
        <Box p={3}>
          {loading ? (
            <Box textAlign="center" mt={5}>
              <CircularProgress />
              <Typography mt={2}>Loading content...</Typography>
            </Box>
          ) : apiContent ? (
            <>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {apiContent.title}
              </Typography>
              <Typography>{apiContent.body}</Typography>
            </>
          ) : (
            <Typography>Select a subsection to view content.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ManualsDocs;

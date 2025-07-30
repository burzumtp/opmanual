import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  MoreVert,
  Search,
  BarChart,
  FilterList,
  Download,
  ExpandMore,
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [bulkAnchorEl, setBulkAnchorEl] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const [rowMenuAnchorEl, setRowMenuAnchorEl] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);
  const [tab, setTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    const endpoint =
      tab === 'active'
        ? 'https://688981714c55d5c7395288f0.mockapi.io/news/news?archived=false'
        : 'https://688981714c55d5c7395288f0.mockapi.io/news/news?archived=true';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Fetched data is not an array', data);
          setArticles([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch articles', err);
        setArticles([]);
      });
  }, [tab]);

  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? articles.map((a) => a.id) : []);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openMenu = Boolean(anchorEl);
  const openBulkMenu = Boolean(bulkAnchorEl);
  const openDownloadMenu = Boolean(downloadAnchorEl);
  const openRowMenu = Boolean(rowMenuAnchorEl);

  const filteredArticles = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.publishedBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportData = (type) => {
    const data = filteredArticles.map(({ id, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Articles');

    const fileType = type === 'csv' ? 'csv' : 'xlsx';
    const wbout =
      type === 'csv'
        ? XLSX.utils.sheet_to_csv(ws)
        : XLSX.write(wb, { bookType: fileType, type: 'array' });
    const blob = new Blob([wbout], {
      type:
        type === 'csv'
          ? 'text/csv;charset=utf-8;'
          : 'application/octet-stream',
    });
    saveAs(blob, `articles_export.${fileType}`);
    setDownloadAnchorEl(null);
  };

  const handleArchiveSelected = async () => {
    const updatedArticles = await Promise.all(
      selected.map(async (id) => {
        try {
          const res = await fetch(
            `https://688981714c55d5c7395288f0.mockapi.io/news/news/${id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ archived: 'true' }),
            }
          );
          return res.json();
        } catch (error) {
          console.error(`Failed to archive article ${id}`, error);
          return null;
        }
      })
    );

    const successfulArchivedIds = updatedArticles
      .filter((a) => a && a.archived === 'true')
      .map((a) => a.id);

    setArticles((prev) =>
      prev.filter((a) => !successfulArchivedIds.includes(a.id))
    );
    setSelected([]);
    setBulkAnchorEl(null);
  };

  const handleRowMenuOpen = (event, id) => {
    setRowMenuAnchorEl(event.currentTarget);
    setActiveRowId(id);
  };

  const handleRowMenuClose = () => {
    setRowMenuAnchorEl(null);
    setActiveRowId(null);
  };

  const handleDeleteClick = (articleId) => {
    setArticleToDelete(articleId);
    setOpenDeleteModal(true);
    handleRowMenuClose();
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://688981714c55d5c7395288f0.mockapi.io/news/news/${articleToDelete}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setArticles((prev) => prev.filter((article) => article.id !== articleToDelete));
        setSelected((prev) => prev.filter((id) => id !== articleToDelete));
      } else {
        console.error('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    } finally {
      setOpenDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={1}>
          {selected.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<ExpandMore />}
              onClick={(e) => setBulkAnchorEl(e.currentTarget)}
            >
              Bulk Actions
            </Button>
          )}
          <IconButton><BarChart /></IconButton>
          <Button variant="contained" color="warning">Create Article</Button>
          <Button variant="text" onClick={() => setTab('active')} style={{ borderBottom: tab === 'active' ? '2px solid #ccc' : 'none' }}>Active</Button>
          <Button variant="text" onClick={() => setTab('archived')} style={{ borderBottom: tab === 'archived' ? '2px solid #ccc' : 'none' }}>Archived</Button>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            size="small"
            placeholder="Search by title or publisher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={(e) => setDownloadAnchorEl(e.currentTarget)}>
            <Download />
          </IconButton>
          <IconButton><FilterList /></IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Checkbox onChange={handleSelectAll} checked={selected.length === filteredArticles.length && filteredArticles.length > 0} /></TableCell>
            <TableCell>Title</TableCell>
            <TableCell>News Category(s)</TableCell>
            <TableCell>Views</TableCell>
            <TableCell>% Viewed</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Published By</TableCell>
            <TableCell>Featured</TableCell>
            <TableCell>Pinned</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Archive On</TableCell>
            <TableCell>Scheduled</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArticles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Checkbox checked={selected.includes(article.id)} onChange={() => handleSelect(article.id)} />
              </TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.category || '-'}</TableCell>
              <TableCell>{article.views || 0}</TableCell>
              <TableCell>{article.viewedPercentage || '0.0%'}</TableCell>
              <TableCell>{article.createdAt || '-'}</TableCell>
              <TableCell>{article.createdBy || '-'}</TableCell>
              <TableCell>{article.featured ? 'Yes' : 'No'}</TableCell>
              <TableCell>{article.pinned ? 'Yes' : 'No'}</TableCell>
              <TableCell>{article.status || '-'}</TableCell>
              <TableCell>{article.archivedOn || '-'}</TableCell>
              <TableCell>{article.scheduled || '-'}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleRowMenuOpen(e, article.id)}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredArticles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu anchorEl={bulkAnchorEl} open={openBulkMenu} onClose={() => setBulkAnchorEl(null)}>
        <MenuItem>Change Permissions</MenuItem>
        <MenuItem>Download Viewer Lists</MenuItem>
        <MenuItem onClick={() => setOpenArchiveModal(true)}>Archive</MenuItem>
        <MenuItem>Remove Featured</MenuItem>
        <MenuItem>Remove Pinned</MenuItem>
        <MenuItem>Export</MenuItem>
      </Menu>

      <Menu anchorEl={anchorEl} open={openMenu} onClose={() => setAnchorEl(null)}>
        <MenuItem>Manage News Categories</MenuItem>
      </Menu>

      <Menu anchorEl={downloadAnchorEl} open={openDownloadMenu} onClose={() => setDownloadAnchorEl(null)}>
        <MenuItem onClick={() => exportData('csv')}>Export as CSV</MenuItem>
        <MenuItem onClick={() => exportData('xlsx')}>Export as Excel</MenuItem>
      </Menu>

      <Menu anchorEl={rowMenuAnchorEl} open={openRowMenu} onClose={handleRowMenuClose}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Clone</MenuItem>
        <MenuItem onClick={() => handleDeleteClick(activeRowId)}>Delete</MenuItem>
        <MenuItem>Viewer List</MenuItem>
        <MenuItem>Export</MenuItem>
      </Menu>

      <Dialog open={openArchiveModal} onClose={() => setOpenArchiveModal(false)}>
        <DialogTitle>Confirm Archive</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to archive the selected content?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArchiveModal(false)} color="primary">
            No
          </Button>
          <Button
            onClick={async () => {
              await handleArchiveSelected();
              setOpenArchiveModal(false);
            }}
            color="error"
            autoFocus
          >
            Yes, Archive
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this article? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageArticles;
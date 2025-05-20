import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Popper, Box, Typography, TextField, Button, Avatar, IconButton, Paper, ClickAwayListener } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const green = '#388e3c';

export default function ProfileDropdown({ open, anchorEl, onClose }) {
  const { user, updateProfile } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '' });

  useEffect(() => {
    if (open) {
      setEdit(false);
      setForm({ username: user?.username || '', email: user?.email || '' });
    }
  }, [open, user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    updateProfile(form);
    setEdit(false);
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end" style={{ zIndex: 1300 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper elevation={6} sx={{ p: 2, borderRadius: 3, minWidth: 260, bgcolor: '#e8f5e9' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: green, width: 44, height: 44, mr: 1 }}>
              {user?.username?.[0]?.toUpperCase() || '?'}
            </Avatar>
            <Typography variant="subtitle1">Profile</Typography>
            <IconButton onClick={() => setEdit((e) => !e)} sx={{ ml: 'auto' }} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          {edit ? (
            <>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                margin="dense"
                InputProps={{ style: { borderRadius: 8 } }}
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="dense"
                InputProps={{ style: { borderRadius: 8 } }}
              />
              <Button
                variant="contained"
                sx={{ mt: 1, bgcolor: green, ':hover': { bgcolor: '#2e7031' }, borderRadius: 8 }}
                onClick={handleSave}
                fullWidth
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2" mb={0.5}><b>Username:</b> {user?.username}</Typography>
              <Typography variant="body2"><b>Email:</b> {user?.email}</Typography>
            </>
          )}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
}

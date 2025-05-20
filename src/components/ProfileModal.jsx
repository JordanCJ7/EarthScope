import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Modal, Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const green = '#388e3c';

export default function ProfileModal({ open, onClose }) {
  const { user, updateProfile } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    updateProfile(form);
    setEdit(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#e8f5e9',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          minWidth: 320,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: green, width: 56, height: 56, mr: 2 }}>
            {user?.username?.[0]?.toUpperCase() || '?'}
          </Avatar>
          <Typography variant="h6">Profile</Typography>
          <IconButton onClick={() => setEdit((e) => !e)} sx={{ ml: 'auto' }}>
            <EditIcon />
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
              margin="normal"
              InputProps={{ style: { borderRadius: 8 } }}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { borderRadius: 8 } }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: green, ':hover': { bgcolor: '#2e7031' }, borderRadius: 8 }}
              onClick={handleSave}
              fullWidth
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" mb={1}><b>Username:</b> {user?.username}</Typography>
            <Typography variant="body1"><b>Email:</b> {user?.email}</Typography>
          </>
        )}
      </Box>
    </Modal>
  );
}

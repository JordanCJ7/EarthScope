import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab } from '@mui/material';

const green = '#388e3c';

const initialForm = { username: '', password: '', email: '' };

function getUsers() {
  const users = localStorage.getItem('earthscope_users');
  return users ? JSON.parse(users) : [];
}
function saveUsers(users) {
  localStorage.setItem('earthscope_users', JSON.stringify(users));
}

export default function LoginRegister() {
  const { login } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTab = (_, v) => {
    setTab(v);
    setForm(initialForm);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password || (tab === 1 && !form.email)) {
      setError('Please fill all fields.');
      return;
    }
    let users = getUsers();
    if (tab === 1) {
      // Register
      if (users.some(u => u.username === form.username)) {
        setError('Username already exists.');
        return;
      }
      const userData = { username: form.username, email: form.email, password: form.password };
      users.push(userData);
      saveUsers(users);
      localStorage.setItem('earthscope_user', JSON.stringify(userData));
      login(userData);
    } else {
      // Login
      const userData = users.find(u => u.username === form.username && u.password === form.password);
      if (!userData) return setError('Invalid credentials or user not registered.');
      localStorage.setItem('earthscope_user', JSON.stringify(userData));
      login(userData);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#e8f5e9">
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, minWidth: 340 }}>
        <Tabs value={tab} onChange={handleTab} centered textColor="primary" indicatorColor="primary">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box component="form" mt={2} onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{ style: { borderRadius: 8 } }}
          />
          {tab === 1 && (
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ style: { borderRadius: 8 } }}
            />
          )}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{ style: { borderRadius: 8 } }}
          />
          {error && <Typography color="error" mt={1}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: green, ':hover': { bgcolor: '#2e7031' }, borderRadius: 8 }}
          >
            {tab === 0 ? 'Login' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

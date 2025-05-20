import React, { useContext, useState, useRef } from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Avatar, IconButton } from '@mui/material';
import ProfileDropdown from './ProfileModal';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleLogout = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#388e3c',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log out',
          background: '#e8f5e9',
          customClass: { popup: 'swal2-border-radius' }
        }).then((result) => {
          if (result.isConfirmed) {
            logout();
          }
        });
    };

    return (
        <header className="app-header">
            <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <FaGlobeAmericas className="header-icon" />
                    <span className="header-title">EarthScope</span>
                </Link>
                {user && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton ref={anchorRef} onClick={() => setOpen((v) => !v)}>
                      <Avatar sx={{ bgcolor: '#388e3c' }}>{user.username?.[0]?.toUpperCase() || '?'}</Avatar>
                    </IconButton>
                    <button onClick={handleLogout} style={{ marginLeft: 12, background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                    <ProfileDropdown open={open} anchorEl={anchorRef.current} onClose={() => setOpen(false)} />
                  </div>
                )}
            </div>
        </header>
    );
};

export default Header;
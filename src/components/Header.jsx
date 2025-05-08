import React from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <FaGlobeAmericas className="header-icon" />
                    <span className="header-title">EarthScope</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
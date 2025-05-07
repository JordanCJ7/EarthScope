import React from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <FaGlobeAmericas className="header-icon" />
                <span className="header-title">EarthScope</span>
            </div>
        </header>
    );
};

export default Header;
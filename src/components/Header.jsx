import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>EarthScope</h1>
            <input type="text" placeholder="Search for a country..." />
            <select>
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </header>
    );
};

export default Header;
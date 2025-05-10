import React from 'react';
import { FaSearch, FaGlobe, FaLanguage } from 'react-icons/fa';

const regions = [
    'All Regions',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
];

const SearchBar = ({ searchTerm, setSearchTerm, region, setRegion, language, setLanguage, languages }) => {
    return (
        <div className="search-bar-container enhanced-bar">
            <div className="input-icon-group">
                <FaSearch className="input-icon" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search for a country..."
                    aria-label="Search for a country"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="input-icon-group">
                <FaGlobe className="input-icon" />
                <select
                    className="region-select"
                    aria-label="Filter by region"
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                >
                    {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>
            <div className="input-icon-group">
                <FaLanguage className="input-icon" />
                <select
                    className="language-select"
                    aria-label="Filter by language"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                >
                    <option value="All Languages">All Languages</option>
                    {languages && languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchBar; 
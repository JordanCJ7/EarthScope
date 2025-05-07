import React from 'react';

const regions = [
    'All Regions',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
];

const SearchBar = ({ searchTerm, setSearchTerm, region, setRegion }) => {
    return (
        <div className="search-bar-container">
            <input
                className="search-input"
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <select
                className="region-select"
                value={region}
                onChange={e => setRegion(e.target.value)}
            >
                {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar; 
import React from 'react';

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
            <select
                className="language-select"
                value={language}
                onChange={e => setLanguage(e.target.value)}
            >
                <option value="All Languages">All Languages</option>
                {languages && languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar; 
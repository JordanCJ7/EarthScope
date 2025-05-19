import React from 'react';
import { FaSearch, FaGlobe, FaLanguage } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const regions = [
    'All Regions',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
];

const iconStyle = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    pointerEvents: 'none',
    color: '#27c47c'
};

const inputPaddingLeft = 36;

const SearchBar = ({ searchTerm, setSearchTerm, region, setRegion, language, setLanguage, languages }) => {
    return (
        <Box className="search-bar-container enhanced-bar" display="flex" flexWrap="wrap" gap={2} alignItems="center" justifyContent="center">
            <Box className="input-icon-group" position="relative" minWidth={260} sx={{ mb: { xs: 1, sm: 0 } }}>
                <FaSearch className="input-icon" style={iconStyle} />
                <TextField
                    label="Search for a country"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    aria-label="Search for a country"
                    fullWidth
                    InputProps={{ style: { paddingLeft: inputPaddingLeft }}}
                    InputLabelProps={{ style: { marginLeft: 25 } }}
                />
            </Box>
            <Box className="input-icon-group" position="relative" minWidth={180} sx={{ mb: { xs: 1, sm: 0 } }}>
                <FaGlobe className="input-icon" style={iconStyle} />
                <FormControl size="small" variant="outlined" fullWidth>
                    <InputLabel id="region-select-label">Region</InputLabel>
                    <Select
                        labelId="region-select-label"
                        value={region}
                        label="Region"
                        onChange={e => setRegion(e.target.value)}
                        aria-label="Filter by region"
                        sx={{ pl: 3 }}
                        inputProps={{ style: { paddingLeft: inputPaddingLeft } }}
                    >
                        {regions.map(r => (
                            <MenuItem key={r} value={r}>{r}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box className="input-icon-group" position="relative" minWidth={200}>
                <FaLanguage className="input-icon" style={iconStyle} />
                <FormControl size="small" variant="outlined" fullWidth>
                    <InputLabel id="language-select-label">Language</InputLabel>
                    <Select
                        labelId="language-select-label"
                        value={language}
                        label="Language"
                        onChange={e => setLanguage(e.target.value)}
                        aria-label="Filter by language"
                        sx={{ pl: 3 }}
                        inputProps={{ style: { paddingLeft: inputPaddingLeft } }}
                    >
                        <MenuItem value="All Languages">All Languages</MenuItem>
                        {languages && languages.map(lang => (
                            <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default SearchBar;
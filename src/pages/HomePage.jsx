import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import { fetchAllCountries } from '../services/api';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('All Regions');
    const [language, setLanguage] = useState('All Languages');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const data = await fetchAllCountries();
                setCountries(data);
            } catch (err) {
                setError('Failed to load country data. Please check your connection or try again later.');
            } finally {
                setLoading(false);
            }
        };
        getCountries();
    }, []);

    useEffect(() => {
        // Compute unique languages from all countries
        const langSet = new Set();
        countries.forEach(country => {
            if (country.languages) {
                Object.values(country.languages).forEach(lang => langSet.add(lang));
            }
        });
        setLanguages(Array.from(langSet).sort());
    }, [countries]);

    useEffect(() => {
        setFilteredCountries(
            countries.filter((country) => {
                if (!country.name || typeof country.name !== 'object') return false;
                const countryName = country.name.common || '';
                const matchesSearch = countryName.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRegion = region === 'All Regions' || country.region === region;
                let matchesLanguage = true;
                if (language !== 'All Languages') {
                    if (!country.languages) return false;
                    matchesLanguage = Object.values(country.languages).some(lang => lang === language);
                }
                return matchesSearch && matchesRegion && matchesLanguage;
            })
        );
    }, [searchTerm, region, language, countries]);

    if (loading) {
        return (
            <div className="centered-message">
                <div className="spinner"></div>
                <div style={{ marginTop: 16, color: '#27c47c', fontSize: 20 }}>Loading countries...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="centered-message error">
                <span role="img" aria-label="error" style={{ fontSize: 32, marginBottom: 12 }}>⚠️</span>
                <div style={{ color: '#c0392b', fontSize: 20 }}>{error}</div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <section className="hero-section">
                <h1 className="hero-title">🌍 EarthScope</h1>
                <p className="hero-subtitle">Discover countries, regions, and languages of the world</p>
                <p className="hero-desc">Browse, search, and filter through a rich database of countries. Click on any country to see detailed information and fun facts!</p>
            </section>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                region={region}
                setRegion={setRegion}
                language={language}
                setLanguage={setLanguage}
                languages={languages}
            />
            <div className="country-grid fade-in">
                {filteredCountries.length === 0 ? (
                    <div className="centered-message empty">
                        <span role="img" aria-label="not found" style={{ fontSize: 40, marginBottom: 10 }}>🔍</span>
                        <div style={{ color: '#888', fontSize: 18 }}>No countries found. Try adjusting your search or filters.</div>
                    </div>
                ) : (
                    filteredCountries.map(country => (
                        <CountryCard key={country.cca3} country={country} />
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
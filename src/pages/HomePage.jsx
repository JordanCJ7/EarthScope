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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
    }

    return (
        <div>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                region={region}
                setRegion={setRegion}
                language={language}
                setLanguage={setLanguage}
                languages={languages}
            />
            <div className="country-grid">
                {filteredCountries.map(country => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
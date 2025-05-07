import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import { fetchAllCountries } from '../services/api';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('All Regions');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            const data = await fetchAllCountries();
            setCountries(data);
            setLoading(false);
        };
        getCountries();
    }, []);

    useEffect(() => {
        setFilteredCountries(
            countries.filter((country) => {
                if (!country.name || typeof country.name !== 'object') return false;
                const countryName = country.name.common || '';
                const matchesSearch = countryName.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRegion = region === 'All Regions' || country.region === region;
                return matchesSearch && matchesRegion;
            })
        );
    }, [searchTerm, region, countries]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                region={region}
                setRegion={setRegion}
            />
            <div className="country-grid">
                {filteredCountries.map(country => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
        </div>
    );
};

export default Home;
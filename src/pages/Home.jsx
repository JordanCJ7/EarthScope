import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/api';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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
            countries.filter(country =>
                country.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, countries]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="country-list">
                {filteredCountries.map(country => (
                    <CountryCard key={country.alpha3Code} country={country} />
                ))}
            </div>
        </div>
    );
};

export default Home;
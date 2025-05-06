import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import CountryCard from '../components/CountryCard';

const HomePage = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                return response.json();
            })
            .then((data) => setCountries(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="country-grid">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    );
};

export default HomePage;
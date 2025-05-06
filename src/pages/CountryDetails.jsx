import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryDetails } from '../services/api';

const CountryDetails = () => {
    const { countryName } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCountryDetails = async () => {
            try {
                const data = await fetchCountryDetails(countryName);
                setCountry(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCountryDetails();
    }, [countryName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {country && (
                <div>
                    <h1>{country.name}</h1>
                    <img src={country.flag} alt={`Flag of ${country.name}`} />
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Languages: {country.languages.map(lang => lang.name).join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default CountryDetails;
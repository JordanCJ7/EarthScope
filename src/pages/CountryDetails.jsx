import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryDetails } from '../services/api';

const CountryDetails = () => {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCountryDetails = async () => {
            try {
                const data = await fetchCountryDetails(code);
                setCountry(data && data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCountryDetails();
    }, [code]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {country && (
                <div>
                    <h1>{country.name?.common}</h1>
                    <img src={country.flags?.png} alt={`Flag of ${country.name?.common}`} />
                    <p>Population: {country.population?.toLocaleString()}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital?.[0]}</p>
                    <p>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default CountryDetails;
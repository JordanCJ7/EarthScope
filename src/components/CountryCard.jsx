import React from 'react';

const CountryCard = ({ country }) => {
    return (
        <div className="country-card">
            <img src={country.flags?.png} alt={`Flag of ${country.name?.common}`} />
            <h2>{country.name?.common}</h2>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p>
                <strong>Languages:</strong>{' '}
                {country.languages
                    ? Object.values(country.languages).join(', ')
                    : 'N/A'}
            </p>
        </div>
    );
};

export default CountryCard;
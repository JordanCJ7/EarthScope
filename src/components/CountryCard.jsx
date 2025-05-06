import React from 'react';

const CountryCard = ({ country }) => {
    return (
        <div className="country-card">
            <img src={country.flags.png} alt={`Flag of ${country.name}`} />
            <h2>{country.name}</h2>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
        </div>
    );
};

export default CountryCard;
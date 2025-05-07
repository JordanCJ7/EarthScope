import React from 'react';
import { FaUsers, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

const CountryCard = ({ country }) => {
    return (
        <div className="country-card">
            <img className="country-flag" src={country.flags?.png} alt={`Flag of ${country.name?.common}`} />
            <h2 className="country-name">{country.name?.common}</h2>
            <div className="country-details">
                <p><FaUsers /> Population: {country.population.toLocaleString()}</p>
                <p><FaGlobe /> Region: {country.region}</p>
                <p><FaMapMarkerAlt /> Capital: {country.capital?.[0] || 'N/A'}</p>
            </div>
            <button className="details-btn">View Details</button>
        </div>
    );
};

export default CountryCard;
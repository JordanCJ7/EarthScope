import React from 'react';
import { FaUsers, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
            <Link to={`/country/${country.cca3}`} style={{ textDecoration: 'none' }}>
                <button className="details-btn">View Details</button>
            </Link>
        </div>
    );
};

export default CountryCard;
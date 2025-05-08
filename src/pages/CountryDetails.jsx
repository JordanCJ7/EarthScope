import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCountryDetails } from '../services/api';
import { FaArrowLeft, FaUsers, FaGlobe, FaMapMarkerAlt, FaMap, FaMoneyBill, FaFlag, FaCar, FaFutbol, FaPhone, FaGlobeAmericas } from 'react-icons/fa';

const CountryDetails = () => {
    const { code } = useParams();
    const history = useHistory();
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
    if (!country) return <div>No data found.</div>;

    // Helper functions
    const getNativeNames = () => {
        if (!country.name?.nativeName) return 'N/A';
        return Object.values(country.name.nativeName).map(n => n.official).join(', ');
    };
    const getCurrencies = () => {
        if (!country.currencies) return 'N/A';
        return Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ');
    };
    const getDemonyms = () => {
        if (!country.demonyms) return 'N/A';
        return Object.values(country.demonyms).map(d => d.f).join(', ');
    };
    const getCallingCodes = () => {
        if (!country.idd?.root || !country.idd?.suffixes) return 'N/A';
        return country.idd.suffixes.map(s => `${country.idd.root}${s}`).join(', ');
    };
    const getGini = () => {
        if (!country.gini) return 'N/A';
        return Object.entries(country.gini).map(([year, value]) => `${year}: ${value}`).join(', ');
    };
    const getBorders = () => {
        if (!country.borders || country.borders.length === 0) return 'None';
        return country.borders.join(', ');
    };
    const getAltSpellings = () => {
        if (!country.altSpellings) return 'N/A';
        return country.altSpellings.join(', ');
    };
    const getTranslations = () => {
        if (!country.translations) return 'N/A';
        return Object.values(country.translations).map(t => t.common).join(', ');
    };

    return (
        <div style={{ maxWidth: 900, margin: '32px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32 }}>
            <button onClick={() => history.goBack()} style={{ marginBottom: 24, background: 'none', border: 'none', color: '#27c47c', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaArrowLeft style={{ marginRight: 8 }} /> Back
            </button>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 320px', minWidth: 280 }}>
                    <img src={country.flags?.svg || country.flags?.png} alt={`Flag of ${country.name?.common}`} style={{ width: '100%', maxWidth: 350, borderRadius: 8, marginBottom: 16 }} />
                    {country.coatOfArms?.svg && <img src={country.coatOfArms.svg} alt="Coat of Arms" style={{ width: 120, marginTop: 8, background: '#f8f8f8', borderRadius: 8 }} />}
                </div>
                <div style={{ flex: '2 1 400px', minWidth: 280 }}>
                    <h1 style={{ fontSize: '2.2rem', marginBottom: 8 }}>{country.name?.common}</h1>
                    <p style={{ fontSize: 18, color: '#555', marginBottom: 8 }}><FaGlobeAmericas /> <b>Official Name:</b> {country.name?.official}</p>
                    <p><b>Native Name(s):</b> {getNativeNames()}</p>
                    <p><FaUsers /> <b>Population:</b> {country.population?.toLocaleString()}</p>
                    <p><FaGlobe /> <b>Region:</b> {country.region} ({country.subregion})</p>
                    <p><FaMapMarkerAlt /> <b>Capital:</b> {country.capital?.join(', ') || 'N/A'}</p>
                    <p><b>Area:</b> {country.area?.toLocaleString()} km²</p>
                    <p><b>Timezones:</b> {country.timezones?.join(', ')}</p>
                    <p><FaMoneyBill /> <b>Currencies:</b> {getCurrencies()}</p>
                    <p><b>Languages:</b> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                    <p><b>Demonym:</b> {getDemonyms()}</p>
                    <p><b>Start of Week:</b> {country.startOfWeek}</p>
                    <p><FaCar /> <b>Drives on:</b> {country.car?.side}</p>
                    <p><FaMap /> <b>Google Maps:</b> <a href={country.maps?.googleMaps} target="_blank" rel="noopener noreferrer">View</a></p>
                    <p><FaMap /> <b>OpenStreetMap:</b> <a href={country.maps?.openStreetMaps} target="_blank" rel="noopener noreferrer">View</a></p>
                    <p><b>Borders:</b> {getBorders()}</p>
                    <p><b>Top-level Domain:</b> {country.tld?.join(', ')}</p>
                    <p><FaPhone /> <b>Calling Code(s):</b> {getCallingCodes()}</p>
                    <p><FaFutbol /> <b>FIFA Code:</b> {country.fifa || 'N/A'}</p>
                    <p><b>UN Member:</b> {country.unMember ? 'Yes' : 'No'}</p>
                    <p><b>Independent:</b> {country.independent ? 'Yes' : 'No'}</p>
                    <p><b>Alt Spellings:</b> {getAltSpellings()}</p>
                    <p><b>Gini Index:</b> {getGini()}</p>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;
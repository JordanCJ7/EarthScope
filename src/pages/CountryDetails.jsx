import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCountryDetails } from '../services/api';
import { FaArrowLeft, FaUsers, FaGlobe, FaMapMarkerAlt, FaMap, FaMoneyBill, FaFlag, FaCar, FaFutbol, FaPhone, FaGlobeAmericas, FaSpinner } from 'react-icons/fa';

const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 600,
    margin: '24px 0 12px',
    color: '#27c47c',
    letterSpacing: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8
};
const dividerStyle = {
    border: 'none',
    borderTop: '1px solid #eee',
    margin: '18px 0'
};
const labelStyle = { fontWeight: 500, color: '#333' };
const valueStyle = { color: '#444' };
const infoRowStyle = { marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 };
const linkStyle = {
    color: '#27c47c',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s',
};
const linkHoverStyle = { color: '#1a8c5a' };

const CountryDetails = () => {
    const { code } = useParams();
    const history = useHistory();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);

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

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
            <FaSpinner className="spin" style={{ fontSize: 48, color: '#27c47c', marginBottom: 16, animation: 'spin 1s linear infinite' }} />
            <div style={{ fontSize: 20, color: '#888' }}>Loading country details...</div>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
        </div>
    );
    if (error) return <div style={{ color: '#c0392b', textAlign: 'center', marginTop: 80, fontSize: 20 }}>⚠️ Error: {error}</div>;
    if (!country) return <div style={{ color: '#888', textAlign: 'center', marginTop: 80, fontSize: 20 }}>No data found for this country.</div>;

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
        <div style={{ maxWidth: 950, margin: '32px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 36, fontFamily: 'Segoe UI, Arial, sans-serif', transition: 'box-shadow 0.2s', minHeight: 600 }}>
            <button
                onClick={() => history.goBack()}
                style={{ marginBottom: 32, background: '#27c47c', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '10px 22px', borderRadius: 8, boxShadow: '0 2px 8px rgba(39,196,124,0.08)', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#1a8c5a'}
                onMouseOut={e => e.currentTarget.style.background = '#27c47c'}
            >
                <FaArrowLeft style={{ marginRight: 10 }} /> Back
            </button>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {/* Flag and Coat of Arms */}
                <div style={{ flex: '1 1 340px', minWidth: 280, textAlign: 'center' }}>
                    <img src={country.flags?.svg || country.flags?.png} alt={`Flag of ${country.name?.common}`} style={{ width: '100%', maxWidth: 320, borderRadius: 10, marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }} />
                    {country.coatOfArms?.svg && <img src={country.coatOfArms.svg} alt="Coat of Arms" style={{ width: 90, marginTop: 10, background: '#f8f8f8', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }} />}
                    <div style={{ marginTop: 18, fontSize: 18, color: '#27c47c', fontWeight: 600 }}>{country.name?.common}</div>
                    <div style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>{country.name?.official}</div>
                </div>
                {/* Details Card */}
                <div style={{ flex: '2 1 420px', minWidth: 280 }}>
                    {/* General Info */}
                    <div style={sectionTitleStyle}><FaFlag /> General Info</div>
                    <div style={infoRowStyle}><span style={labelStyle}>Native Name(s):</span> <span style={valueStyle}>{getNativeNames()}</span></div>
                    <div style={infoRowStyle}><FaUsers /> <span style={labelStyle}>Population:</span> <span style={valueStyle}>{country.population?.toLocaleString()}</span></div>
                    <div style={infoRowStyle}><FaGlobeAmericas /> <span style={labelStyle}>Region:</span> <span style={valueStyle}>{country.region} ({country.subregion})</span></div>
                    <div style={infoRowStyle}><FaMapMarkerAlt /> <span style={labelStyle}>Capital:</span> <span style={valueStyle}>{country.capital?.join(', ') || 'N/A'}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Languages:</span> <span style={valueStyle}>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Demonym:</span> <span style={valueStyle}>{getDemonyms()}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Alt Spellings:</span> <span style={valueStyle}>{getAltSpellings()}</span></div>
                    <hr style={dividerStyle} />
                    {/* Geography */}
                    <div style={sectionTitleStyle}><FaMap /> Geography</div>
                    <div style={infoRowStyle}><span style={labelStyle}>Area:</span> <span style={valueStyle}>{country.area?.toLocaleString()} km²</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Timezones:</span> <span style={valueStyle}>{country.timezones?.join(', ')}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Borders:</span> <span style={valueStyle}>{getBorders()}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Top-level Domain:</span> <span style={valueStyle}>{country.tld?.join(', ')}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Start of Week:</span> <span style={valueStyle}>{country.startOfWeek}</span></div>
                    <div style={infoRowStyle}><FaCar /> <span style={labelStyle}>Drives on:</span> <span style={valueStyle}>{country.car?.side}</span></div>
                    <div style={infoRowStyle}><FaMap /> <span style={labelStyle}>Google Maps:</span> <a
                        href={country.maps?.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={hoveredLink === 'google' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
                        onMouseEnter={() => setHoveredLink('google')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >View</a></div>
                    <div style={infoRowStyle}><FaMap /> <span style={labelStyle}>OpenStreetMap:</span> <a
                        href={country.maps?.openStreetMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={hoveredLink === 'osm' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
                        onMouseEnter={() => setHoveredLink('osm')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >View</a></div>
                    <hr style={dividerStyle} />
                    {/* Economy */}
                    <div style={sectionTitleStyle}><FaMoneyBill /> Economy</div>
                    <div style={infoRowStyle}><span style={labelStyle}>Currencies:</span> <span style={valueStyle}>{getCurrencies()}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Gini Index:</span> <span style={valueStyle}>{getGini()}</span></div>
                    <hr style={dividerStyle} />
                    {/* Other */}
                    <div style={sectionTitleStyle}><FaFutbol /> Other</div>
                    <div style={infoRowStyle}><FaPhone /> <span style={labelStyle}>Calling Code(s):</span> <span style={valueStyle}>{getCallingCodes()}</span></div>
                    <div style={infoRowStyle}><FaFutbol /> <span style={labelStyle}>FIFA Code:</span> <span style={valueStyle}>{country.fifa || 'N/A'}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>UN Member:</span> <span style={valueStyle}>{country.unMember ? 'Yes' : 'No'}</span></div>
                    <div style={infoRowStyle}><span style={labelStyle}>Independent:</span> <span style={valueStyle}>{country.independent ? 'Yes' : 'No'}</span></div>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;
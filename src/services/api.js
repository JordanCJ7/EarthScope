import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all countries:', error);
        throw error;
    }
};

export const fetchCountryByName = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country by name (${name}):`, error);
        throw error;
    }
};

export const fetchCountriesByRegion = async (region) => {
    try {
        const response = await axios.get(`${BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by region (${region}):`, error);
        throw error;
    }
};

export const fetchCountryDetails = async (code) => {
    try {
        const response = await axios.get(`${BASE_URL}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country details (${code}):`, error);
        throw error;
    }
};
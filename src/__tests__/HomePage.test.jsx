import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

// Mock dependencies
jest.mock('../components/CountryCard', () => () => <div>CountryCard</div>);
jest.mock('../components/SearchBar', () => () => <div>SearchBar</div>);
jest.mock('../services/api', () => ({
  fetchAllCountries: jest.fn(() => Promise.resolve([])),
}));

describe('HomePage', () => {
  it('renders loading state initially', () => {
    render(<HomePage />);
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });
});


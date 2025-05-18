import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../components/CountryCard';

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  capital: ['Washington, D.C.'],
  region: 'Americas',
  population: 331002651,
  flags: { png: 'https://flagcdn.com/us.png', alt: 'Flag of United States' },
  languages: { eng: 'English' },
};

describe('CountryCard', () => {
  it('renders country details', () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );
    expect(screen.getByText(/United States/i)).toBeInTheDocument();
    expect(screen.getByText(/Washington, D.C./i)).toBeInTheDocument();
    expect(screen.getByText(/Americas/i)).toBeInTheDocument();
    expect(screen.getByAltText(/flag of united states/i)).toBeInTheDocument();
  });
});

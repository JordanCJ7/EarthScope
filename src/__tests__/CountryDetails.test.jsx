import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryDetails from '../pages/CountryDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ code: 'USA' }),
  useHistory: () => ({ goBack: jest.fn() }),
}));

jest.mock('../services/api', () => ({
  fetchCountryDetails: jest.fn(() =>
    Promise.resolve([
      {
        cca3: 'USA',
        name: {
          common: 'United States',
          official: 'United States of America',
          nativeName: { eng: { official: 'United States of America' } },
        },
        capital: ['Washington, D.C.'],
        region: 'Americas',
        subregion: 'Northern America',
        population: 331002651,
        flags: { svg: 'https://flagcdn.com/us.svg', png: 'https://flagcdn.com/us.png' },
        languages: { eng: 'English' },
        demonyms: { eng: { f: 'American', m: 'American' } },
        altSpellings: ['US', 'USA', 'United States of America'],
        area: 9833520,
        timezones: ['UTC-05:00'],
        borders: ['CAN', 'MEX'],
        tld: ['.us'],
        startOfWeek: 'Sunday',
        car: { side: 'right' },
        maps: { googleMaps: 'https://goo.gl/maps/usa', openStreetMaps: 'https://osm.org/usa' },
        currencies: { USD: { name: 'United States dollar', symbol: '$' } },
        gini: { 2018: 41.4 },
        idd: { root: '+1', suffixes: [''] },
        fifa: 'USA',
        unMember: true,
        independent: true,
        coatOfArms: { svg: '' },
        translations: {},
      },
    ])
  ),
}));

describe('CountryDetails', () => {
  it('renders country details after loading', async () => {
    render(
      <MemoryRouter>
        <CountryDetails />
      </MemoryRouter>
    );
    const matches = await screen.findAllByText(/united states/i);
    expect(matches.length).toBeGreaterThan(0);
    expect(screen.getByText(/Washington, D.C./i)).toBeInTheDocument();
    expect(screen.getByText(/Americas/i)).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByAltText(/flag of united states/i)).toBeInTheDocument();
  });
});

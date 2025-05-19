import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

const mockCountries = [
  {
    cca3: 'USA',
    name: { common: 'United States' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 331002651,
    flags: { png: 'https://flagcdn.com/us.png', alt: 'Flag of United States' },
    languages: { eng: 'English' },
  },
  {
    cca3: 'ESP',
    name: { common: 'Spain' },
    capital: ['Madrid'],
    region: 'Europe',
    population: 47000000,
    flags: { png: 'https://flagcdn.com/es.png', alt: 'Flag of Spain' },
    languages: { spa: 'Spanish' },
  },
];

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url.endsWith('/all')) {
      return Promise.resolve({ data: mockCountries });
    }
    if (url.includes('/name/Spain')) {
      return Promise.resolve({ data: [mockCountries[1]] });
    }
    if (url.includes('/region/Europe')) {
      return Promise.resolve({ data: [mockCountries[1]] });
    }
    if (url.includes('/alpha/ESP')) {
      return Promise.resolve({ data: [mockCountries[1]] });
    }
    if (url.includes('/alpha/USA')) {
      return Promise.resolve({ data: [mockCountries[0]] });
    }
    return Promise.resolve({ data: [] });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Integration: User flow', () => {
  it('allows searching, filtering, and navigation', async () => {
    render(<App />);

    // Wait for countries to load
    await waitFor(() => expect(screen.getByText(/United States/i)).toBeInTheDocument());

    // Search for "Spain"
    fireEvent.change(screen.getByRole('textbox', { name: /search for a country/i }), { target: { value: 'Spain' } });
    expect(screen.getByDisplayValue('Spain')).toBeInTheDocument();
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();
    expect(screen.queryByText(/United States/i)).not.toBeInTheDocument();

    // Filter by region
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /region/i }));
    fireEvent.click(screen.getByText('Europe'));
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();

    // Filter by language
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /language/i }));
    fireEvent.click(screen.getByText('Spanish'));
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();

    // Simulate navigation to country details (if implemented with a link/button)
    // fireEvent.click(screen.getByText(/Spain/i));
    // await waitFor(() => expect(screen.getByText(/Madrid/i)).toBeInTheDocument());
  });
});

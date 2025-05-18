import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const mockSetSearchTerm = jest.fn();
  const mockSetRegion = jest.fn();
  const mockSetLanguage = jest.fn();
  const languages = ['English', 'Spanish'];

  it('renders search input and dropdowns', () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        region="All Regions"
        setRegion={mockSetRegion}
        language="All Languages"
        setLanguage={mockSetLanguage}
        languages={languages}
      />
    );
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });

  it('calls setSearchTerm on input change', () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        region="All Regions"
        setRegion={mockSetRegion}
        language="All Languages"
        setLanguage={mockSetLanguage}
        languages={languages}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/search for a country/i), { target: { value: 'test' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });
});

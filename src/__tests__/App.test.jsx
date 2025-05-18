import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('App', () => {
  it('renders without crashing and shows EarthScope', () => {
    render(<App />);
    expect(screen.getByText(/earthscope/i)).toBeInTheDocument();
  });
});

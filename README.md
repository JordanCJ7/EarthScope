# EarthScope

EarthScope is a modern React application that displays comprehensive country information using the REST Countries API. Users can search, filter, and view detailed data about countries in an intuitive, responsive interface.

## Features

- Browse a list of countries with their names, flags, populations, regions, capitals, and languages.
- **Search** functionality to find countries by name.
- **Filter** countries by region and language.
- View **detailed information** about each country, including bordering countries and more.
- Responsive design for mobile and desktop.

## Technologies Used

- React.js (with hooks)
- React Router
- REST Countries API
- CSS (custom, responsive)

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/JordanCJ7/EarthScope-JavaScript.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd EarthScope-JavaScript
   ```

3. **Install dependencies** (requires Node.js v14+)
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser and visit**
   [http://localhost:3000](http://localhost:3000)

## Screenshots

<!-- Uncomment and add screenshots if available -->
<!--
![Home Page](public/screenshot-home.png)
![Country Details](public/screenshot-details.png)
-->

## Testing

This project uses **Jest** and **React Testing Library** for unit and integration testing.

### Test Overview
- **App.test.jsx**: Checks that the main app renders and displays the EarthScope title.
- **Header.test.jsx**: Ensures the header renders and displays the app title inside a router context.
- **SearchBar.test.jsx**: Verifies the search bar renders, and that input and dropdowns work and call their handlers.
- **CountryCard.test.jsx**: Checks that a country card displays the country name, capital, region, population, and flag (wrapped in a router context).
- **CountryDetails.test.jsx**: Mocks the API and router, then checks that detailed country info (name, capital, region, language, flag, etc.) is rendered after loading.
- **HomePage.test.jsx**: Ensures the loading state is shown initially.

### How to Run Tests

- **Run all tests:**
  ```bash
  npm test
  # or
  npx jest
  ```

- **Run a specific test file:**
  ```bash
  npx jest src/__tests__/CountryCard.test.jsx
  npx jest src/__tests__/CountryDetails.test.jsx
  # ...and so on for each test file
  ```

Test results and coverage will be shown in the terminal. All tests are located in the `src/__tests__/` directory.

## API Reference

This application uses the [REST Countries API](https://restcountries.com/) to fetch country data.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).
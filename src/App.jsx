import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CountryDetails from './pages/CountryDetails';

const App = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <HomePage countries={countries} />
                    </Route>
                    <Route path="/country/:code" component={CountryDetails} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
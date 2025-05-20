import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CountryDetails from './pages/CountryDetails';
import LoginRegister from './components/LoginRegister';
import { AuthContext } from './context/AuthContext';

const App = () => {
    const [countries, setCountries] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    return (
        <Router>
            <div>
                {user && <Header />}
                <Switch>
                    <Route path="/login" exact>
                        {user ? <Redirect to="/" /> : <LoginRegister />}
                    </Route>
                    <Route path="/" exact>
                        {user ? <HomePage countries={countries} /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/country/:code" render={(props) => user ? <CountryDetails {...props} /> : <Redirect to="/login" />} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
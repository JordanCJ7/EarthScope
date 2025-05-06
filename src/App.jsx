import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/country/:name" component={CountryDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
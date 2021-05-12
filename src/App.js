import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/main/main-page.component';
import ErrorContainer from './components/error-container/error-container'

const App = () => {
  return (
    <div className="App">
      <ErrorContainer />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/:pokeId' component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;

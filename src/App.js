import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Upload from "./Upload";
import Files from "./Files";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
      <div className="app">
          <header className="app-header">
              <Navigation />
          </header>
          <main>
              <Router>
                  <Switch>
                      <Route path="/" exact >
                          <Files />
                      </Route>
                      <Route path="/upload" >
                          <Upload />
                      </Route>
                  </Switch>
              </Router>
          </main>
          <footer>
            <Footer />
          </footer>
    </div>
  );
}

export default App;

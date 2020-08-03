import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Upload from "./components/Upload";
import Files from "./components/Files";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import About from "./components/About";

import './styles/App.css';

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
                      <Route path="/about" >
                          <About />
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

import './App.css'
import Navbar from "./components/Navbar.jsx"
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RecordList from './components/RecordList';
import Edit from './components/Edit';
import Create from './components/Create';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create">
              <Create />
          </Route>
          <Route path="/edit/:id">
            <Edit/>
          </Route>
          <Route path="/">
            <RecordList />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App

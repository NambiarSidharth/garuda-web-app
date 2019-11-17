import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom"
import {Provider} from "react-redux"
import Login from "./Component/Login/Login"
import Navigation from "./Component/Common/Navigation"
import Landing from "./Component/Common/Landing"
import Dashboard from "./Component/Dashboard/Dashboard"
import Store from "./Store/Store"
// import Dashboard1 from "./Component/Dash/Dashboard/Dashboard"
import PrivateRoute from "./Component/Common/PrivateRoute"
import Reports from "./Component/Report/Reports"
import Report from "./Component/Report/Report"
import Stats from "./Component/Stats/Stats"
import ReportData from "./Component/ReportData/ReportData"
import "tachyons"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import 'react-open-weather/lib/css/ReactWeather.css';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css"
function App() { 
  return (
    <div className="App">
      <Provider store={Store}>
      <Router>
        <Navigation />
        <div className="container-fluid">
        <Route exact path='/' component={Landing} />
        <Route exact path='/auth' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        {/* <Route exact path='/dash' component={Dashboard1} /> */}
        <Route exact path='/reports' component={Reports} />
        <Route exact path='/reports/:id' component={Report} />
        <Route exact path='/stats' component={Stats} />
        <Route exact path='/reportdata' component={ReportData} />
        </div>
      </Router>
      </Provider>
    </div>
  );
}

export default App;

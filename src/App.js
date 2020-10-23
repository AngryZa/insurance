import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import BenefitPage from './views/Benefit';
import DataPage from './views/Data';
import HomePage from './views/Home';
import IntroducePage from './views/Introduce';
import introduceCompany from './views/IntroduceCompany';
import PlanPage from './views/Plan';
import ResultPage from './views/Result';
import DuringPage from './views/During';


import shareUrl from './asset/js/share';

class App extends Component {
  render() {
    return (
      <Router basename={'/cfzx'}>
        <Route render={()=>(
          <Switch>
            {shareUrl()}
            <Route cache='parent' path="/benefit" component={BenefitPage}/>
            <Route path="/data" component={DataPage}/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/introduce" exact component={IntroducePage}/>
            <Route path="/plan" exact component={PlanPage}/>
            <Route path="/result" exact component={ResultPage}/>
            <Route path="/during" exact component={DuringPage}/>
            <Route path="/introduceCompany" exact component={introduceCompany}/>
          </Switch>
        )}></Route>
      </Router>
    );
  }
}

export default App;

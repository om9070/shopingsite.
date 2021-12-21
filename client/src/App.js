import React from 'react'
import { Route, Switch } from "react-router-dom";
import Dorder from './Dorder';
import Footer from './Footer';
import Heading from './Heading';
import Log from './Log';
import Midpart from './Midpart';
import Order from './Order';
import Out from './Out';
import Register from './Register';
import Updateres from './Updateres';
function App() {
  return (

    <>
      <Heading />
      <Switch>
        <Route exact path="/" component={Midpart} />
        <Route exact path="/log" component={Log} />
        <Route exact path="/profile" component={Register} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/update" component={Updateres} />
        <Route exact path="/dorder" component={Dorder} />
        <Route exact path="/out" component={Out} />
      </Switch>
      <Footer />
    </>

  );
}

export default App;

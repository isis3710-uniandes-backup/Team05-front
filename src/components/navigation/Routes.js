import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BioAndes from '../views/BioAndes';
import Clase from '../views/Clase';
import Clases from '../views/Clases';
import Especimen from '../views/Especimen';
import Nosotros from '../views/Nosotros';
import Contactenos from '../views/Contactenos';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={BioAndes} />
        <Route exact path='/clases' component={Clases} />
        <Route exact path='/clase' component={Clase} />
        <Route exact path='/especimen/:id' component={Especimen} />
        <Route exact path='/nosotros' component={Nosotros} />
        <Route exact path='/contactenos' component={Contactenos} />
      </Switch>
    );
  }
}
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BioAndes from './views/BioAndes';
import Colecciones from './views/Colecciones';
import Nosotros from './views/Nosotros';
import Contactenos from './views/Contactenos';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={BioAndes} />
        <Route exact path='/colecciones' component={Colecciones} />
        <Route exact path='/nosotros' component={Nosotros} />
        <Route exact path='/contactenos' component={Contactenos} />
      </Switch>
    );
  }
}
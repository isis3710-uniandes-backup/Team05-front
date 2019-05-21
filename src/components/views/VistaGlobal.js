import React, { Component } from "react";
import Tree from '../content/Tree';
import "./VistaGlobal.css";

class VistaGlobal extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    const response = await fetch('https://boiling-brushlands-27343.herokuapp.com/api/especimenes');
    const especimenes = await response.json();

    const data = {
      name: 'Life',
      children: []
    };
    especimenes.forEach(especimen => {
      this.addValue(especimen, data.children, 0);
    });

    this.Tree = new Tree('#tree', data);
    this.setState({ data: data });
  }

  addValue = (especimen, children, parameterIndex) => {
    let parameterName;
    switch (parameterIndex) {
      case 0:// dominio
        parameterName = especimen.dominio;
        break;
      case 1:// reino
        parameterName = especimen.reino;
        break;
      case 2:// filo
        parameterName = especimen.filo;
        break;
      case 3:// clase
        parameterName = especimen.clase;
        break;
      case 4:// orden
        parameterName = especimen.orden;
        break;
      case 5:// familia
        parameterName = especimen.familia;
        break;
      case 6:// genero
        parameterName = especimen.genero;
        break;
      case 7:// especie
        parameterName = especimen.especie;
        break;
      default:
        return;
    }

    const group = children.find(set => set.name === parameterName) || {};
    if (!group.name) {
      group.name = parameterName;
      if (parameterIndex < 7) {
        group.children = [];
      }
      children.push(group);
    }

    if (parameterIndex === 7) {
      group.size = (group.size || 0) + 1;
    }

    this.addValue(especimen, group.children, parameterIndex + 1);
  }

  render() {

    return (
      <div className="vista-global">
        <p>La vista global permite observar fácilmente las categorías a las que pertenecen los especímenes en un mismo lugar.</p>
        <div id='tree'></div>
      </div>
    );
  }
}
export default VistaGlobal;
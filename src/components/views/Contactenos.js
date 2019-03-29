import React from 'react';
import "./Contactenos.css";

export default class Contactenos extends React.Component {
  render() {
    return (
      <div className="contactenos">

        <span>
        Si tienes alguna inquietud déjanos tu correo y te contactaremos. </span>

        <form className="contactenos">
        <div class="form-group" className="contactenos">
          <label for="usr">Correo electrónico:</label>
          <div>
            <input type="email" class="form-control" id="usr">
            </input>
          </div>
        </div>
        <div class="form-group" className="contactenos">
          <label for="comment">Consulta:</label>
          <div>
            <textarea class="form-control" rows="10" cols="60" id="comment"></textarea>
          </div>
        </div>
          <div  className="contactenos">
            <button type="submit" class="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    );
  }
}

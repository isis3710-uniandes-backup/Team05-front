import React from 'react';
import InputFeedback from './InputFeedback';
import './EspecimenTextInput.css';

class EspecimenTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      datalist: [],
      inputIsOk: false,
      feedback: '',
      postingNewValue: false
    };
  }

  async componentDidMount() {
    const response = await fetch(`http://api.bioandes.cpotdevin.com/api/${this.props.collection}`);
    const options = await response.json();

    this.setState({
      datalist: options.map(item => item.nombre)
    });
  }

  getDataitem = (item, index) => {
    return (
      <option key={index} value={item} />
    );
  }

  handleChange = async (event) => {
    const value = event.target.value;
    this.props.handleParameterChange(this.props.name, value);
    let inputIsOk = false;
    let feedback = '';
    if (value === '') {
      feedback = 'Por favor llene este parámetro';
      this.props.setInputStatus(this.props.name + 'Ready', false);
    } else if (this.state.datalist.indexOf(value) === -1) {
      feedback = 'Asegurese de usar un valor disponible o añadirlo si es necesario.';
      this.props.setInputStatus(this.props.name + 'Ready', false);
    } else {
      inputIsOk = true;
      feedback = 'OK';
      this.props.setInputStatus(this.props.name + 'Ready', true);
    }
    this.setState({
      inputText: value,
      inputIsOk: inputIsOk,
      feedback: feedback
    });
  }

  handleAddClick = async (event) => {
    event.preventDefault();

    this.setState({
      postingNewValue: true
    });

    const value = this.state.inputText;
    const response = await fetch(`http://api.bioandes.cpotdevin.com/api/${this.props.collection}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre: value })
    });

    await response.json();

    this.setState((prevState) => ({
      datalist: prevState.datalist.concat(value),
      inputIsOk: true,
      feedback: 'OK',
      postingNewValue: false
    }));

    this.props.setInputStatus(this.props.name + 'Ready', true);
  }

  render() {
    const datalist = this.state.datalist.map(this.getDataitem);

    let inputClass = 'complete';
    let addButton;
    if (this.state.postingNewValue) {
      inputClass = 'part';
      addButton = <input type='button' value={'Añadiendo...'} disabled />;
    } else if (this.state.inputText === '' || -1 < this.state.datalist.indexOf(this.state.inputText)) {
      addButton = <div className='hidden-button'></div>;
    } else {
      inputClass = 'part';
      addButton = (
        <input type='button' value={`Añadir`} onClick={this.handleAddClick} />
      );
    }

    return (
      <div className='record-new-input-slot'>
        <div className='record-new-input'>
          <label>{this.props.label}</label>
          <input className={inputClass} type='text' name={this.props.name} value={this.state.inputText} onChange={this.handleChange}
            list={`selection-options-${this.props.name}`} autoComplete='off' />
          {addButton}
        </div>
        <InputFeedback isOk={this.state.inputIsOk} feedback={this.state.feedback} />

        <datalist id={`selection-options-${this.props.name}`}>
          {datalist}
        </datalist>
      </div>
    );
  }
}

export default EspecimenTextInput;
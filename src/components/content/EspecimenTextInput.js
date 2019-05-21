import React from 'react';
import { FormattedMessage } from 'react-intl';
import InputFeedback from './InputFeedback';
import { getBackUrl } from '../api/BackInfo';
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
    const response = await fetch(`https://boiling-brushlands-27343.herokuapp.com/api/${this.props.collection}`);
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
      feedback = (
        <FormattedMessage id="especimen.please.fill" defaultMessage="Por favor llene este parámetro." />
      );
      this.props.setInputStatus(this.props.name + 'Ready', false);
    } else if (this.state.datalist.indexOf(value) === -1) {
      feedback = (
        <FormattedMessage id="especimen.please.use" defaultMessage="Asegurese de usar un valor disponible o añadirlo si es necesario." />
      );
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
    const response = await fetch(`${getBackUrl()}/api/${this.props.collection}`, {
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
      addButton = (
        <FormattedMessage id="especimen.adding" defaultMessage="Añadiendo...">
          {val => <input type="button" value={val} onClick={this.handleAddClick} />}
        </FormattedMessage>
      );
    } else if (this.state.inputText === '' || -1 < this.state.datalist.indexOf(this.state.inputText)) {
      addButton = <div className='hidden-button'></div>;
    } else {
      inputClass = 'part';
      addButton = (
        <FormattedMessage id="especimen.add" defaultMessage="Añadir">
          {val => <input type="button" value={val} onClick={this.handleAddClick} />}
        </FormattedMessage>
      );
    }

    return (
      <div className='record-new-input-slot'>
        <div className='record-new-input'>
          <label htmlFor={`record-new-${this.props.name}`}>{this.props.label}</label>
          <input id={`record-new-${this.props.name}`} className={inputClass} type='text' name={this.props.name}
            value={this.state.inputText} onChange={this.handleChange}
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
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {addLocaleData} from 'react-intl';
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";
import './index.css';
import App from './App';
import messages from './Locales/messages.js';

addLocaleData(en);
addLocaleData(es);

const language = navigator.language.split('-')[0];
ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById('root')
);
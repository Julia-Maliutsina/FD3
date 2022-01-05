import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import MobileCompany from './components/MobileCompany';
import reportWebVitals from './reportWebVitals';
import { CLIENTS } from './constants';

ReactDOM.render(
  <React.StrictMode>
    <MobileCompany clients={CLIENTS} />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

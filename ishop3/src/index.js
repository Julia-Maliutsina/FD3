import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import IShop from './components/IShop';
import reportWebVitals from './reportWebVitals';
import { GOODS } from './constants'

ReactDOM.render(
  <React.StrictMode>
    <IShop goods={GOODS}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

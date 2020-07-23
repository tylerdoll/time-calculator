import React from 'react';
import ReactDOM from 'react-dom';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import './index.css';
import App from './App';

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

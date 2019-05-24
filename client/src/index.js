import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

//This file is the first file to be loaded by webpack.
//Everything intializes from here.
ReactDOM.render(
    <App/>, 
  document.getElementById('app')
)
registerServiceWorker();

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import App from './App'

//This file is the first file to be loaded by webpack.
//Everything intializes from here.
//The store and App are bound here.
ReactDOM.render(
    <Provider store={store}><App/></Provider>, 
  document.getElementById('app')
)
registerServiceWorker();

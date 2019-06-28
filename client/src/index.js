import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
import App from './App'

//This file is the first file to be loaded by webpack.
//Everything intializes from here.
//The store and App are bound here.

//Optional cofiguration for Alerts
// const options = {
//   position: positions.BOTTOM_CENTER,
//   timeout: 5000,
//   offset: '30px',
//   transition: transitions.SCALE
// }

ReactDOM.render(
  //<AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}><App /></Provider>
  //</AlertProvider>
  ,
  document.getElementById('app')
)
registerServiceWorker();

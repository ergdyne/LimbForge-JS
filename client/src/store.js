import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers'

const middleware = applyMiddleware(promise,thunk,logger)
//const middleware = applyMiddleware(promise,thunk,logger)
//This is the entry point for the store. It is bound to the webApp in index.js.

export default createStore(reducer, middleware)
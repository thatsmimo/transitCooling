import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'
import App from './App'

import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'

const middleware = [thunkMiddleware]
const store = compose(applyMiddleware(...middleware))(createStore)(reducers)

let persistor = persistStore(store)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

export default Root

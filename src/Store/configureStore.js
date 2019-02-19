import { createStore } from 'redux';

import toggleCollection from './Reducers/collectionReducer.js'

export default createStore(toggleCollection)

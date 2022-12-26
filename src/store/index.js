import { createStore, combineReducers } from 'redux';
import heroes from '../reducers/heroesReducer';
import filters from '../reducers/filtersReducer';


const store = createStore(combineReducers({heroes, filters}), 
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
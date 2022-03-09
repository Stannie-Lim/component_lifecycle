import axios from 'axios';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';

const thingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_THINGS':
      return action.things;

    default:
      return state;
  }
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CATEGORIES':
      return action.categories;

    default:
      return state;
  }
};

const reducer = combineReducers({
  things: thingsReducer,
  categories: categoriesReducer,
});

const store = createStore(reducer, applyMiddleware(thunks));

const getThings = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/things');
    dispatch({
      type: 'LOAD_THINGS',
      things: response.data,
    });
  };
};

const getCategories = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/categories');
    dispatch({
      type: 'LOAD_CATEGORIES',
      categories: response.data,
    });
  };
};

export default store;
export {
  getThings,
  getCategories,
};

window.store = store;
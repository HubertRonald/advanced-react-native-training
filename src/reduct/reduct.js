function combineReducers(reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((result, key) => {
      let currentReducer = reducers[key];
      result[key] = currentReducer(state[key], action);
      return result;
    }, {});
  };
}

function createStore(reducer, initialState) {
  let currentReducer = reducer;
  let currentState = initialState;
  const listeners = [];

  const getState = () => currentState;
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };
  const dispatch = (action) => {
    currentState = currentReducer(currentState, action);
    listeners.slice().forEach((listener) => listener());
    return action;
  };

  dispatch({type: '@@redux/INIT'});

  return {
    getState,
    subscribe,
    dispatch,
  };
}

export {combineReducers, createStore};

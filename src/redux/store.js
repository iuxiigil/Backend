import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import logger from "redux-logger";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware(middlewares));
sagaMiddleware.run(rootSaga);
export { store };

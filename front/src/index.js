import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getUsers } from "./components/actions/usersActions";
import { getPosts } from "./components/actions/postActions";
// Redux tools
import { Provider } from "react-redux";
import {applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor} from "./reducers/store";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}> 
      <App />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

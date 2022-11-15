import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getUsers } from "./components/actions/usersActions";
import { getPosts } from "./components/actions/postActions";
// Redux tools
import { Provider } from "react-redux";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./components/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./components/reducer";

const store = configureStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

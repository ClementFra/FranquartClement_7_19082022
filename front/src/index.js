import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import allReducers from "./reducers/store";
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, allReducers);
let store = configureStore(persistedReducer);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

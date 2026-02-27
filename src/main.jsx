import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//context
import UserContextProvider from './Context/UserContextProvider.jsx'


//redux
import {Provider} from "react-redux";
import {store} from "./Redux/Store/store.js";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <UserContextProvider>
    <Provider store={store}>
       <App/>
    </Provider>
    </UserContextProvider>

  </React.StrictMode>,
)

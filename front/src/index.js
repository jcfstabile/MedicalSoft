import * as React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './css/index.css';
import App from './App.js';

const root = ReactDom.createRoot( document.getElementById('root'))
root.render(
 <BrowserRouter>
    <App/>
 </BrowserRouter>,
)

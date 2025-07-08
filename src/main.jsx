import {
  
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from "./Router/Router.jsx";
import ContextProvider from "./Context/AuthContextProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
  </StrictMode>,
)

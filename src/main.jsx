import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import { UserContextProvider } from './context/UserContext'
import { ExpenseContextProvider } from './context/ExpenseContext'
import { ReminderContextProvider } from './context/ReminderContext'


const apiUrl =import.meta.env.VITE_API_URL
axios.defaults.baseURL = apiUrl

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <UserContextProvider>
    <ExpenseContextProvider>
    <ReminderContextProvider>
      <App />
    </ReminderContextProvider>
    </ExpenseContextProvider>
    </UserContextProvider>
    </Router>
  </StrictMode>,
)

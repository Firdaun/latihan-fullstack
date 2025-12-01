import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import App from './App.jsx'
import Contact from './Contact.jsx'
import Navbar from './Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

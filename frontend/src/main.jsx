import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import App from './App.jsx'
import Contact from './components/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Course from './components/Course.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/course' element={<Course embedId="yOIO5h3ENIw" title="Web Dev Course"/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </StrictMode>,
)

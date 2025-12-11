import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import App from './App.jsx'
import Contact from './components/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Course from './components/Course.jsx'
import ProtectedAbout from './components/ProtectedAbout.jsx'
import Blog from './components/Blog.jsx'
import { AdminProvider } from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<ProtectedAbout />} />
          <Route path='/course' element={<Course embedId="yOIO5h3ENIw" title="Web Dev Course" />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AdminProvider>
  </StrictMode>
)

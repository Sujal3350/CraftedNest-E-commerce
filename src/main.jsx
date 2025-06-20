import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import React from 'react'
import Home from './Components/Home/Home.jsx'
import Product from './Components/Product/Product.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Cart from './Components/Cart/Cart.jsx'
import User from './Components/User/User.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Chat from './Components/Chat/Chat.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer position="top-right" autoClose={3000} />


const router=createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='product' element={<Product/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='Contact' element={<Contact/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='user' element={<User/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='chat' element={<Chat/>}/>
    </Route>
    
  )
  
)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>,
)

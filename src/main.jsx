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
import Wishlist from './Components/Wishlist/Wishlist.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReturnsRefunds from './Components/Returns & Refunds/ReturnsRefunds.jsx'
import PrivatePolicy from './Components/PrivacyPolicy/PrivacyPolicy.jsx'
import Profile from './Components/Profile/Profile.jsx'

<ToastContainer position="top-right" autoClose={3000} />


const router=createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<Layout/>}>
      <Route path='/home' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/' element={<User/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/returnrefunds' element={<ReturnsRefunds/>}/>
      <Route path='/privatepolicy' element={<PrivatePolicy/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Route>
    
  )
  
)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer position="top-right" autoClose={1000} />
  </React.StrictMode>,
)

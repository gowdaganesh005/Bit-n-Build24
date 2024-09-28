import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import UserInventory from './Pages/UserInventory.jsx'
import AddClothes from './Pages/AddClothes.jsx'
import UserClothes from './Pages/UserClothes.jsx'
import AddElectronics from './Pages/AddElectronics.jsx'
import Home from './Pages/Home.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import Register from './Pages/Register.jsx'
import UserElectronics from './Pages/UserElectronics.jsx'
import UserAccessories from './Pages/UserAccessories.jsx'
import AddAccessories from './Pages/AddAccessories.jsx'
import Chat from './Pages/CommunityChat.jsx'
import Login from './Pages/Login.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      
      <Route path='/user-inventory' element={<UserInventory/>}/>
      <Route path='/add-clothes' element={<AddClothes/>}/>
      <Route path='/user-clothes' element={<UserClothes/>}/>
      <Route path='/user-electronics' element={<UserElectronics/>}/>
      <Route path='/add-electronics' element={<AddElectronics/>}/>
      <Route path='/user-accessories' element={<UserAccessories/>}/>
      <Route path='/add-accessories' element={<AddAccessories/>}/>
      <Route path='/community-chat' element={<Chat/>}/>
      <Route path="/login" element={<Login/>}/>

      
      <Route path='/register' element={<Register/>}/>
      <Route path='' element={<Home/>}/>
    </Route>

  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      
    <RouterProvider router={router} />
    
    </AuthProvider>
  </React.StrictMode>,
)

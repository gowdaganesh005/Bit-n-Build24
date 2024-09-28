import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import UserInventory from './Pages/UserInventory.jsx'
import AddClothes from './Pages/AddClothes.jsx'
import UserClothes from './Pages/UserClothes.jsx'
import CarbonFootprintCalculator from './Pages/CarbnoFootPrint.jsx'
import Home from './Pages/Home.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import Register from './Pages/Register.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      
      <Route path='/user-inventory' element={<UserInventory/>}/>
      <Route path='/add-clothes' element={<AddClothes/>}/>
      <Route path='/user-clothes' element={<UserClothes/>}/>
      <Route path='/carbon-footprint' element={<CarbonFootprintCalculator/>}/>
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

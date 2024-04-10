import { useState } from 'react'
import './App.css'
import Signup from './pages/user/signup'
import { RouterProvider } from 'react-router-dom'
import router from './pages/router'
import Receipt from './components/Receipt/Receipt'
import Shipment from './components/shipment/Shipment'


function App() {

  return (
    <>
      {/* <RouterProvider router={router}/> */}
      <Shipment/>
    </>
  )
}

export default App;

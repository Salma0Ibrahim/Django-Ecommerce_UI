import { useState } from 'react'
import './App.css'
import Signup from './pages/user/signup'
import { RouterProvider } from 'react-router-dom'
import router from './pages/router'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App



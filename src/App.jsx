import { useState } from 'react'
import Signup from './pages/user/signup'
import { RouterProvider } from 'react-router-dom'
import router from './pages/router'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;

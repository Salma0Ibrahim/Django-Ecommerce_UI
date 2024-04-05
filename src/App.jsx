import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Cart from './cart/index.jsx';
import Navbar2 from './navbar/index.jsx';
import { Routes, Route } from 'react-router-dom'; // Import Routes
import Wishlist from './wishlist/index.jsx';
import Products from './products/index.jsx';

function App() {
  return (
    <div className='App'>
      <Navbar2 />
      <Routes> 
        <Route path='/cart' element={<Cart />} />
        <Route path='/wish' element={<Wishlist />} />
        <Route exact path='/' element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import React from 'react';
import { Root } from '../components/root/Root';
import GatherArtwork from '../features/artwork/GatherArtwork';
import ArtworkItem from '../components/artworkItem/ArtworkItem';
import GatherCart from '../features/cart/GatherCart';
import CheckoutForm from '../components/checkoutForm/CheckoutForm';
import Home from '../components/home/Home';



const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>} >
    <Route index element={<Home/>} />
    <Route path='artwork' element={<GatherArtwork/>} >
    </Route>
    <Route path='artwork/:ID' element={<ArtworkItem/>} />
    <Route path='cart' element={<GatherCart/>} />
    <Route path='checkout' element={<CheckoutForm/>} />
  </Route>
))

function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App;

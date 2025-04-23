import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import React from 'react';
import { Root } from '../components/root/Root';
import Artwork from '../components/artwork/Artwork';
import GatherArtwork from '../features/artwork/GatherArtwork';
import ArtworkItem from '../components/artworkItem/ArtworkItem';
import Cart from '../components/cart/Cart';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>} >
    <Route path='artwork' element={<GatherArtwork/>} />
    <Route path='artwork/:ID' element={<ArtworkItem/>} />
    <Route path='cart' element={<Cart/>} />
  </Route>
))

function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App;

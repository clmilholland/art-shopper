import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import React from 'react';
import { Root } from '../components/root/Root';
import Artwork from '../components/artwork/Artwork';
import GatherArtwork from '../features/artwork/GatherArtwork';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>} >
    <Route index element={<GatherArtwork/>} />
  </Route>
))

function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App;

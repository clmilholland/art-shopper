import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import React from 'react';
import { Root } from '../components/Root';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>} >

  </Route>
))

function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App;

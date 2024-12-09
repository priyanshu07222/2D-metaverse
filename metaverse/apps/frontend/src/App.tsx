
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Layout } from './Layout'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
import { UserInfo } from './pages/UserInfo'
import { Spaces } from './pages/Spaces'
import { MapEditor } from './pages/MapEditor'
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='' element={<Layout />} >
        <Route path='' element={<Home/>}/>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='user-info' element={<UserInfo/>}/>
        <Route path='spaces' element={<Spaces/>} />
        <Route path='map-editor' element={<MapEditor/>} />
      </Route>
    )
  )


  // console.log(game)
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

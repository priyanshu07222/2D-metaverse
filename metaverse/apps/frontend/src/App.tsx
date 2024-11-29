import phaser from 'phaser'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Layout } from './Layout'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
function App() {
  // const config = {
  //   type: Phaser.AUTO,
  //   width: 800,
  //   height: 300,
  //   backgroundColor: "#e2e"
  // };
  // let game = new phaser.Game(config)
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path='/' element={<Home/>} >
  //       <Route path='/signup' element={<signup/>}>
  //     </Route>
  //   )
  // )
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route path='' element={<Home/>}/>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
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

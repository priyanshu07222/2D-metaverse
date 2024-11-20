import phaser from 'phaser'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import { signup }  from './pages/signup' 
function App() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    backgroundColor: "#e2e"
  };
  let game = new phaser.Game(config)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Home/>} >
        <Route path='/signup' element={<signup/>}>
      </Route>
    )
  )
 

  console.log(game)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

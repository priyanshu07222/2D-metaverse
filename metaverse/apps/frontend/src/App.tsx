import phaser from 'phaser'
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    backgroundColor: "#e2e"
  };
  let game = new phaser.Game(config)
 

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


import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PictureContext } from './context'
import useExternalScripts from './hooks/useScripts'

import Home from './pages/Home'
import Header from './components/layouts/Header'


function App() {

  useExternalScripts('./assets/js/script')
  useExternalScripts('https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js')


  const [refresh, setRefresh] = useState(false)

  return (
    <PictureContext.Provider value={{refresh, setRefresh}}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </PictureContext.Provider>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'

import Layout from "./components/shared/Layout"
import Home from "./components/blog/Home"
import Create from "./components/blog/Create"

function App() {

  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='create' element={<Create />} />
        </Route>
    </Routes>
  )
}

export default App

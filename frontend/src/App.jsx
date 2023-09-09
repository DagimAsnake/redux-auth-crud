import { Routes, Route } from 'react-router-dom'

import Layout from "./components/shared/Layout"
import Home from "./components/blog/Home"
import Create from "./components/blog/Create"
import Details from './components/blog/Details'
import Update from './components/blog/update'

function App() {

  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='create' element={<Create />} />
          <Route path='blog/:blogId' element={<Details />} />
          <Route path='update/:blogId' element={<Update />} />
        </Route>
    </Routes>
  )
}

export default App

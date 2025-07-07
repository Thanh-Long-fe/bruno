
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './page/HomePage'
import AdminPage from './page/AdminPage'
import LoginPage from './page/Login'

function App() {

  return (
     <>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
     </>
  )
}

export default App

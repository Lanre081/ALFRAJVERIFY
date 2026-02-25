import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App.jsx'
import ForgotPassword from '../pages/Auth/forgot-password'
import Login from '../pages/Auth/login'
import Signup from '../pages/Auth/signup'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

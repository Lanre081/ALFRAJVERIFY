import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App.jsx'
import ForgotPassword from '../pages/auth/forgot-password.jsx'
import Login from '../pages/auth/login.jsx'
import Signup from '../pages/auth/signup.jsx'

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

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App.jsx'
import ForgotPassword from '../pages/Auth/forgot-password'
import Login from '../pages/Auth/login'
import Signup from '../pages/Auth/signup'
import LoginPage from '../pages/Auth/LoginPages.jsx'
import DashboardPage from '../pages/Auth/DashboardPage.jsx'
import SignupPage from '../pages/Auth/SignupPage.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

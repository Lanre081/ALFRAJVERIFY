import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../components/Auth/LoginPages.jsx'
import DashboardPage from '../components/Main/DashboardPage.jsx'
import SignupPage from '../components/Auth/SignupPage.jsx'

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

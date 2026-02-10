import { useState } from 'react'
import '../../App.css'
import SiteFooter from '../../components/SiteFooter.jsx'
import SiteHeader from '../../components/SiteHeader.jsx'
import { Link } from 'react-router-dom'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
        <section className="w-full max-w-xl rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,43,70,0.12)] sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Join us to access all services.
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="lastName">
                  Surname
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your surname"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="middleName">
                Middle name (optional)
              </label>
              <input
                id="middleName"
                type="text"
                placeholder="Enter your middle name"
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                Phone number
              </label>
              <div className="flex gap-2">
                <span className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-500">
                  +234
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Create password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M12 5c5.5 0 9.5 4.5 10.8 6.1.3.4.3.4 0 .8C21.5 13.5 17.5 18 12 18S2.5 13.5 1.2 11.9c-.3-.4-.3-.4 0-.8C2.5 9.5 6.5 5 12 5zm0 2C8.1 7 4.9 9.8 3.4 11c1.5 1.2 4.7 4 8.6 4s7.1-2.8 8.6-4C19.1 9.8 15.9 7 12 7zm0 2.5A2.5 2.5 0 1 1 12 14a2.5 2.5 0 0 1 0-5z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-1 w-full rounded-full bg-slate-200">
                <div className="h-1 w-1/3 rounded-full bg-blue-500" />
              </div>
              <p className="text-xs text-slate-500">Password strength: add more characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M12 5c5.5 0 9.5 4.5 10.8 6.1.3.4.3.4 0 .8C21.5 13.5 17.5 18 12 18S2.5 13.5 1.2 11.9c-.3-.4-.3-.4 0-.8C2.5 9.5 6.5 5 12 5zm0 2C8.1 7 4.9 9.8 3.4 11c1.5 1.2 4.7 4 8.6 4s7.1-2.8 8.6-4C19.1 9.8 15.9 7 12 7zm0 2.5A2.5 2.5 0 1 1 12 14a2.5 2.5 0 0 1 0-5z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
              <span>
                I agree to the{' '}
                <Link className="font-medium text-blue-600 hover:text-blue-700" to="/terms">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link className="font-medium text-blue-600 hover:text-blue-700" to="/privacy">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/login">
              Sign in
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Signup

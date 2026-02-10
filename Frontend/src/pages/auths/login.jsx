import '../../App.css'
import SiteFooter from '../../components/SiteFooter.jsx'
import SiteHeader from '../../components/SiteHeader.jsx'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <SiteHeader />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                Remember me
              </label>
              <Link className="text-blue-600 hover:text-blue-700" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/signup">
              Sign up
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default Login

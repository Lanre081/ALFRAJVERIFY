import { Link } from 'react-router-dom'

function SiteHeader() {
  return (
    <header className="nav">
      <Link className="brand" to="/">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-text">Alfrajsub</span>
      </Link>
      <nav className="nav-links">
        <Link to="/#home">Home</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
      </nav>
      <div className="nav-actions">
        <Link className="btn ghost" to="/login">
          Login
        </Link>
        <Link className="btn solid" to="/signup">
          Sign Up
        </Link>
      </div>
    </header>
  )
}

export default SiteHeader

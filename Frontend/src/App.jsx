import './App.css'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'

const services = [
  {
    title: 'Airtime Purchase',
    description: 'Quick and reliable airtime top up for all networks.',
    icon: 'A',
  },
  {
    title: 'Data Bundles',
    description: 'Affordable data plans for all major networks.',
    icon: 'D',
  },
  {
    title: 'Cable TV',
    description: 'Easy subscription for DSTV, GOTV, and Startimes.',
    icon: 'C',
  },
  {
    title: 'Electricity',
    description: 'Convenient electricity bill payments nationwide.',
    icon: 'E',
  },
  {
    title: 'JAMB PIN',
    description: 'Instant JAMB e-PIN purchase and delivery.',
    icon: 'J',
  },
  {
    title: 'Scratch Cards',
    description: 'Digital scratch cards for various services.',
    icon: 'S',
  },
  {
    title: 'NIN Verification',
    description: 'Quick and secure NIN verification services.',
    icon: 'N',
  },
  {
    title: 'BVN Verification',
    description: 'Reliable BVN verification and validation.',
    icon: 'B',
  },
  {
    title: 'CAC Registration',
    description: 'Professional business registration assistance.',
    icon: 'R',
  },
  {
    title: 'Web Design',
    description: 'Professional website design and development.',
    icon: 'W',
  },
]

const benefits = [
  {
    title: 'Reliable Service',
    description:
      '99.9% uptime guarantee with consistent delivery across networks.',
  },
  {
    title: 'Fast Transactions',
    description: 'Lightning-fast processing with instant delivery.',
  },
  {
    title: 'Secure Platform',
    description: 'Bank-level security with encrypted transactions.',
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock support with dedicated agents.',
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear pricing with no hidden fees or surprises.',
  },
  {
    title: 'All-in-One Solution',
    description: 'Complete suite of VTU and professional services.',
  },
]

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your free account in minutes.',
  },
  {
    title: 'Fund Wallet',
    description: 'Add funds using transfer, card, or USSD.',
  },
  {
    title: 'Select Service',
    description: 'Choose from VTU, bills, or verification services.',
  },
  {
    title: 'Complete Transaction',
    description: 'Enjoy instant processing and confirmations.',
  },
]

function App() {
  return (
    <div className="page">
      <SiteHeader />

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>Your All-in-One Platform for VTU & Professional Services</h1>
            <p>
              Seamlessly manage airtime, data, bill payments, and access
              professional verification and web design services — all from one
              trusted platform.
            </p>
            <div className="hero-actions">
              <button className="btn solid">Get Started</button>
              <button className="btn outline">Learn More</button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="device-frame">
              <div className="device-header" />
              <div className="device-body">
                <div className="device-panel">
                  <span>Dashboard</span>
                  <strong>₦120,450</strong>
                </div>
                <div className="device-panel small">
                  <span>Transactions</span>
                  <strong>1,284</strong>
                </div>
                <div className="device-panel">
                  <span>Verification</span>
                  <strong>98.7%</strong>
                </div>
              </div>
            </div>
            <div className="device-mini phone" />
            <div className="device-mini tablet" />
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>
              Everything you need for digital transactions and professional
              services in one convenient platform.
            </p>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <div className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section muted">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>
              Experience the difference with our trusted, secure, and
              comprehensive service platform.
            </p>
          </div>
          <div className="feature-grid">
            {benefits.map((benefit) => (
              <div className="feature" key={benefit.title}>
                <div className="feature-icon" aria-hidden="true" />
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section steps-section">
          <div className="section-header">
            <h2>Getting Started is Easy</h2>
            <p>Follow these simple steps to start enjoying our services.</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="cta-card">
            <div>
              <h2>Ready to Experience Seamless Digital Services?</h2>
              <p>
                Join thousands of satisfied users who trust our platform for all
                their VTU and professional service needs.
              </p>
              <div className="cta-meta">
                <span>SSL Secured</span>
                <span>50,000+ Users</span>
                <span>1M+ Transactions</span>
              </div>
            </div>
            <button className="btn solid">Sign Up Now</button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App

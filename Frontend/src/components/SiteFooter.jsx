function SiteFooter() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-brand">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">Alfrajsub</span>
        </div>
        <p>Your trusted partner for VTU services and professional solutions.</p>
        <div className="footer-socials">
          <span>fb</span>
          <span>ig</span>
          <span>in</span>
        </div>
      </div>
      <div className="footer-links">
        <div>
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div>
          <h4>Services</h4>
          <span>VTU Services</span>
          <span>Bill Payments</span>
          <span>Verification Services</span>
          <span>Web Design</span>
        </div>
        <div>
          <h4>Contact Info</h4>
          <span>support@alfrajsub.com</span>
          <span>+234 800 123 4567</span>
          <span>123 Tech Hub Avenue, Victoria Island, Lagos</span>
          <span>24/7 Support</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Cookie Policy</span>
        <span>© 2026 Alfrajsub. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default SiteFooter

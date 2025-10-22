class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1a1a2e;
          color: white;
          padding: 2rem;
          text-align: center;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: left;
        }
        .footer-section h3 {
          color: #3a86ff;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-section li {
          margin-bottom: 0.5rem;
        }
        .footer-section a {
          color: #a1a1aa;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-section a:hover {
          color: white;
        }
        .copyright {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #a1a1aa;
          font-size: 0.9rem;
        }
        .social-icons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .social-icons a {
          color: white;
          transition: color 0.3s;
        }
        .social-icons a:hover {
          color: #3a86ff;
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>Explore</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/gallery.html">Gallery</a></li>
              <li><a href="/about.html">About</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Brands</h3>
            <ul>
              <li><a href="#">Toyota</a></li>
              <li><a href="#">Ford</a></li>
              <li><a href="#">BMW</a></li>
              <li><a href="#">Tesla</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="social-icons">
          <a href="#"><i data-feather="facebook"></i></a>
          <a href="#"><i data-feather="twitter"></i></a>
          <a href="#"><i data-feather="instagram"></i></a>
          <a href="#"><i data-feather="youtube"></i></a>
        </div>
        <div class="copyright">
          &copy; 2024 CarVista 360°. All rights reserved.
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
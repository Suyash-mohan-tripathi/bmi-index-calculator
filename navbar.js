class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 10;
        }
        .logo {
          color: #4f46e5;
          font-weight: 700;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .logo-icon {
          width: 24px;
          height: 24px;
          color: #4f46e5;
        }
        ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          position: relative;
        }
        a:hover {
          color: #4f46e5;
        }
        a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #4f46e5;
          transition: width 0.2s;
        }
        a:hover::after {
          width: 100%;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          ul {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">
          <i data-feather="compass" class="logo-icon"></i>
          <span>BMI Universe</span>
        </a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about.html">About</a></li>
          <li><a href="/blog.html">Blog</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
        <button class="mobile-menu-btn">
          <i data-feather="menu" class="text-gray-700"></i>
        </button>
      </nav>
    `;
    
    // Initialize feather icons
    const menuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
    menuBtn.addEventListener('click', () => {
      const ul = this.shadowRoot.querySelector('ul');
      ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
    });
    
    setTimeout(() => {
      feather.replace();
    }, 100);
  }
}

customElements.define('custom-navbar', CustomNavbar);
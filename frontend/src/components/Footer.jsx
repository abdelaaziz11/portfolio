import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>AM<span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Alex Mercer · Built with React & Node.js
        </p>
        <p className="footer-stack">MERN Stack Portfolio</p>
      </div>
    </footer>
  );
}

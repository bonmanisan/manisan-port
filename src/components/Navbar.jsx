import { useState } from "react";
import { NAV_ITEMS } from "../data/portfolioData";

export default function Navbar({ activeNav, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div
        className="nav-logo"
        onClick={() => scrollTo("home")}
      >
        <span className="logo-bracket">&lt;</span>
        CM
        <span className="logo-bracket">/&gt;</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <button
              className={`nav-link ${
                activeNav === item ? "active" : ""
              }`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
import { useEffect, useState } from "react";
import "./App.css";

// LOCAL IMAGE ASSET IMPORT
import heroPhoto from "./assets/p3-profile.png"; 

// CLEANED UP NAMED CERTIFICATION IMPORTS
import cert1 from "./assets/cert1.png";
import cert2 from "./assets/cert2.png";
import cert3 from "./assets/cert3.png";
import cert4 from "./assets/cert4.png";

const NAV_ITEMS = ["HOME", "ABOUT", "EDUCATION", "TECH STACK", "PROJECTS", "CERTIFICATIONS", "CONTACT"];

const EDUCATION_DATA = [
  {
    school: "Holy Cross of Davao College",
    degree: "Bachelor of Science in Information and Technology",
    icon: "🎓" 
  },
  {
    school: "Philippine Women's College of Davao",
    degree: "Senior High School (ICT Programming)",
    icon: "🏫"
  },
  {
    school: "Holy Cross of Malita, Inc.",
    degree: "Junior High School",
    icon: "🏫"
  },
  {
    school: "Malita Central Elementary School",
    degree: "Elementary",
    icon: "👤"
  }
];

const TECH_STACK = [
  { name: "HTML", value: 90, initial: "HTML" },
  { name: "CSS", value: 90, initial: "C" },
  { name: "JavaScript", value: 70, initial: "JS" },
  { name: "C#", value: 90, initial: "C#" },
  { name: "React Ecosystem", subText: "(React.js, React Native, Expo)", value: 90, initial: "R" },
  { name: "Basic SQL", value: 50, initial: "SQL" },
];

const PROJECTS = [
  {
    title: "Guys and Gal's Salon Inventory Management System and POS",
    desc: "An Inventory Management and POS System for Guys and Gal's Salon",
    tech: ["C#", "SQL"],
    link: "https://github.com/bonmanisan/InventoryManagementSystem",
  },
  {
    title: "Sheltr",
    desc: "A mobile application designed to simplify and modernize the pet adoption process.",
    tech: ["React Native", "Firebase"],
    link: "https://github.com/bonmanisan/Sheltr",
  },
];

const CERTIFICATIONS = [
  { title: "Digital Security Fundamentals", year: "2026", image: cert1 },
  { title: "ReactJS for Beginners", year: "2026", image: cert2 },
  { title: "Introduction to Machine Learning with R", year: "2026", image: cert3 },
  { title: "Introduction to Front End Development", year: "2026", image: cert4 },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnmountingLoader, setIsUnmountingLoader] = useState(false);

  // SIMULATE EXPERIENCE LOAD-IN STAGE 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUnmountingLoader(true); // Triggers CSS slide out transitions
      setTimeout(() => {
        setIsLoading(false); // Drops element from the DOM entirely
      }, 800); 
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((n) =>
        document.getElementById(n.toLowerCase().replace(" ", "-"))
      ).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY >= sections[i].offsetTop - 150) {
          const matchedItem = NAV_ITEMS[i];
          setActiveNav(matchedItem);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (item) => {
    const elementId = item.toLowerCase().replace(" ", "-");
    const element = document.getElementById(elementId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);

    const animatedElements = element.querySelectorAll(
      ".p3r-header-style, .p3r-glass-card, .p3r-edu-card, .p3r-tech-hexagon-card, .p3r-project-card, .p3r-cert-node, .hero-container"
    );

    animatedElements.forEach((el) => {
      el.animate(
        [
          { 
            opacity: 0, 
            transform: "translateX(-40px) skewX(-6deg)", 
            filter: "brightness(3) drop-shadow(0 0 15px #00eeff)" 
          },
          { 
            opacity: 0.8, 
            transform: "translateX(5px) skewX(2deg)", 
            filter: "brightness(1.5) drop-shadow(0 0 5px #00eeff)" 
          },
          { 
            opacity: 1, 
            transform: "translateX(0) skewX(0deg)", 
            filter: "brightness(1) drop-shadow(0 0 0px transparent)" 
          }
        ],
        {
          duration: 650,
          easing: "cubic-bezier(0.19, 1, 0.22, 1)",
          fill: "forwards"
        }
      );
    });
  };

  return (
    <div className="app p3r-theme">
      {/* PERSONA 3 RELOAD INSPIRED SCREEN LOADER */}
      {isLoading && (
        <div className={`p3r-loader-screen ${isUnmountingLoader ? "fade-out" : ""}`}>
          <div className="p3r-loader-bg-decorations">
            <div className="p3r-loader-wave" />
            <div className="p3r-loader-stripe" />
          </div>
          <div className="p3r-loader-shards-container">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`p3r-loader-shard shard-${i}`} />
            ))}
          </div>
          <div className="p3r-loading-text-zone">
            <span className="p3r-loading-ticker">NOW LOADING...</span>
            <div className="p3r-loading-subtext">// C.W.M INITIALIZING SYSTEM</div>
          </div>
        </div>
      )}

      {/* ATMOSPHERIC BACKGROUND EFFECTS */}
      <div className="p3r-bg-water-lines" />
      <div className="p3r-overlay-glow" />
      <div className="floating-shards">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="glass-shard" style={{ "--i": i }} />
        ))}
      </div>

      {/* FIXED UPPER-RIGHT TRIGGER INTERFACE */}
      <div className="p3r-menu-trigger-container">
        <div className="trigger-logo-tag">C.W.M // PORTFOLIO</div>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* VERTICAL SIDEBAR MENU SYSTEM */}
      <nav className={`navbar-vertical ${menuOpen ? "open" : ""}`}>
        <div className="vertical-menu-bg-accent" />
        
        <div className="vertical-logo-box">
          <div className="logo-main">C.W.M.</div>
          <div className="logo-sub">NAVIGATION MENU</div>
        </div>

        <ul className="nav-links-vertical">
          {NAV_ITEMS.map((item, idx) => (
            <li 
              key={item} 
              className="nav-item-wrap-vertical"
              style={{ "--nav-idx": idx }}
            >
              <button
                className={`nav-link-vertical ${activeNav === item ? "active" : ""}`}
                onClick={() => scrollTo(item)}
              >
                <span className="nav-num-prefix">0{idx + 1}</span>
                <span className="nav-text-bg">{item}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="vertical-menu-footer">
          STATUS // ACTIVE
        </div>
      </nav>

      {/* BACKDROP CLOSER WHEN VERTICAL MENU IS OPEN */}
      {menuOpen && <div className="menu-backdrop-closer" onClick={() => setMenuOpen(false)} />}

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-left p3r-fade-up">
            <div className="p3r-angular-frame-wrapper">
              <div className="p3r-img-frame">
                <div className="frame-wave-overlay" />
                <img src={heroPhoto} alt="Profile Portrait" className="hero-image" />
              </div>
              <div className="p3r-frame-shadow-shard" />
            </div>

            <div className="social-card p3r-glass-panel">
              <div className="social-top"></div>
              <div className="social-main">
                <div className="social-role">Web Developer</div>
              </div>
            </div>
          </div>

          <div className="hero-right p3r-slide-left">
            <div className="intro">
              <div className="intro-small p3r-tag"></div>
              <h1 className="hero-name p3r-interactive-name">
                <span className="first-name">CHRISTIAN WILSON</span>
                <span className="last-name">MANISAN</span>
              </h1>
              <div className="p3r-sub-title">Bachelor of Science in Information Technology</div>
            </div>

            <div className="status-box p3r-stats-container">
              <div className="stats-header">SKILLS</div>
              {[
                ["FRONTEND", 90],
                ["BACKEND", 50],
                ["HARDWARE", 60],
                ["SOFTWARE", 70],
              ].map(([label, value]) => (
                <div className="status-row" key={label}>
                  <span className="stat-label">{label}</span>
                  <div className="status-bar">
                    <div className="status-fill" style={{ width: `${value}%` }} />
                  </div>
                  <span className="stat-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section">
        <div className="section-header p3r-header-style">
          <span className="header-num">I</span>
          <h2>ABOUT ME</h2>
        </div>

        <div className="about-card p3r-glass-card">
          <p>
            An aspiring developer driven by a passion for creating functional digital solutions and 
            a commitment to mastering modern technology from the ground up. Inspired by sleek layouts 
            and fluid, meaningful interactions.
          </p>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="section">
        <div className="section-header p3r-header-style alt">
          <span className="header-num">II</span>
          <h2>EDUCATION</h2>
        </div>

        <div className="edu-timeline-container">
          {EDUCATION_DATA.map((edu, idx) => (
            <div className="p3r-edu-card" key={idx}>
              <div className="edu-icon-container">
                <span className="edu-icon">{edu.icon}</span>
              </div>
              <div className="edu-details">
                <h3>{edu.school}</h3>
                <p>{edu.degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="tech-stack" className="section">
        <div className="section-header p3r-header-style">
          <span className="header-num">III</span>
          <h2>TECH STACK</h2>
        </div>

        <div className="p3r-tech-grid">
          {TECH_STACK.map((tech, idx) => (
            <div className="p3r-tech-hexagon-card" key={tech.name}>
              <div className="tech-badge-container">
                <div className="tech-badge-skew">
                  <span className="tech-initial-text">{tech.initial}</span>
                </div>
              </div>
              
              <div className="tech-meta">
                <h3>{tech.name}</h3>
                {tech.subText && <p className="tech-sub text-dim">{tech.subText}</p>}
              </div>

              <div className="tech-meter-area">
                <div className="tech-level-bar">
                  <div className="tech-level-fill" style={{ width: `${tech.value}%` }} />
                </div>
                <span className="tech-percentage-text">{tech.value}%</span>
              </div>
              <div className="card-diagonal-accent" />
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section">
        <div className="section-header p3r-header-style alt">
          <span className="header-num">IV</span>
          <h2>PROJECTS</h2>
        </div>

        <div className="project-grid">
          {PROJECTS.map((project, idx) => (
            <div 
              className={`project-card p3r-project-card variant-${idx % 2}`} 
              key={project.title}
              onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
              style={{ cursor: "pointer" }}
            >
              <div className="project-corner-tag">Project // {idx + 1}</div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="tech-wrap">
                {project.tech.map((tech) => (
                  <span key={tech} className="p3r-tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="section">
        <div className="section-header p3r-header-style">
          <span className="header-num">V</span>
          <h2>CERTIFICATIONS</h2>
        </div>

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert) => (
            <div 
              className="p3r-cert-node" 
              key={cert.title}
              onClick={() => setSelectedCert(cert)} 
              style={{ cursor: "pointer" }}
            >
              <div className="cert-node-left">
                <div className="cert-year">{cert.year}</div>
                <div className="cert-title">{cert.title}</div>
              </div>
              <div className="cert-node-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="section-header p3r-header-style alt">
          <span className="header-num">VI</span>
          <h2>CONTACT ME</h2>
        </div>

        <div className="contact-box p3r-glass-card dynamic-glow">
          <div className="calling-card-headline">Let's build something great!</div>
          <div className="contact-item"><span>EMAIL</span> christianmansian23@gmail.com</div>
          <div className="contact-item"><span>GITHUB</span> github.com/bonmanisan</div>
        </div>
      </section>

      {/* MODAL POPUP COMPONENT */}
      {selectedCert && (
        <div className="p3r-modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="p3r-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="p3r-modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            <div className="p3r-modal-header">
              <span className="p3r-modal-year">// {selectedCert.year}</span>
            </div>
            <h3 className="p3r-modal-title">{selectedCert.title}</h3>
            <div className="p3r-modal-img-container">
              <img src={selectedCert.image} alt={selectedCert.title} className="p3r-modal-image" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
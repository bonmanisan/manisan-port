import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

import cert1 from "./assets/cert1.png";
import cert2 from "./assets/cert2.png";
import cert3 from "./assets/cert3.png";
import cert4 from "./assets/cert4.png";
import portraitimg from "./assets/p3-profile.png";

/* ─── DATA ─────────────────────────────────────────────────── */
const NAV_ITEMS = ["HOME","ABOUT","EDUCATION","TECH STACK","PROJECTS","CERTIFICATIONS","CONTACT"];

const EDUCATION_DATA = [
  { school:"Holy Cross of Davao College", degree:"Bachelor of Science in Information Technology", year:"2021–2025", roman:"I" },
  { school:"Philippine Women's College of Davao", degree:"Senior High School — ICT Programming", year:"2019–2021", roman:"II" },
  { school:"Holy Cross of Malita, Inc.", degree:"Junior High School", year:"2015–2019", roman:"III" },
  { school:"Malita Central Elementary School", degree:"Elementary", year:"2009–2015", roman:"IV" },
];

const TECH_STACK = [
  { name:"HTML", value:90, initial:"HTML", color:"#e34c26" },
  { name:"CSS", value:90, initial:"CSS", color:"#264de4" },
  { name:"JavaScript", value:70, initial:"JS", color:"#f5c842" },
  { name:"C#", value:90, initial:"C#", color:"#9b4f96" },
  { name:"React", sub:"React.js / Native / Expo", value:90, initial:"⚛", color:"#61dafb" },
  { name:"SQL", sub:"Basic SQL", value:50, initial:"SQL", color:"#00c49a" },
];

const PROJECTS = [
  { title:"Guys and Gal's Salon IMS & POS", desc:"Inventory Management and Point-of-Sale system for a local salon business.", tech:["C#","SQL"], link:"https://github.com/bonmanisan/InventoryManagementSystem", num:"01", arcana:"THE EMPEROR" },
  { title:"Sheltr", desc:"A mobile application that modernizes and simplifies the pet adoption process.", tech:["React Native","Firebase"], link:"https://github.com/bonmanisan/Sheltr", num:"02", arcana:"THE LOVERS" },
];

const CERTIFICATIONS = [
  { title:"Digital Security Fundamentals", year:"2026", image:cert1 },
  { title:"ReactJS for Beginners", year:"2026", image:cert2 },
  { title:"Introduction to Machine Learning with R", year:"2026", image:cert3 },
  { title:"Introduction to Front End Development", year:"2026", image:cert4 },
];

/* ─── COMPONENTS ─────────────────────────────────────────────── */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""}`} style={{ "--rd": `${delay}ms` }}>
      {children}
    </div>
  );
}

function HudPanel({ children }) {
  return (
    <div className="hud-panel">
      <div className="hud-panel-corner tl" />
      <div className="hud-panel-corner tr" />
      <div className="hud-panel-corner bl" />
      <div className="hud-panel-corner br" />
      {children}
    </div>
  );
}

function SecHeader({ num, title }) {
  return (
    <div className="sec-header">
      <span className="sec-num">{num}</span>
      <div className="sec-diamond" />
      <h2 className="sec-title">{title}</h2>
      <div className="sec-line" />
    </div>
  );
}

/* ─── LOADER ─────────────────────────────────────────────────── */
function Loader({ exiting }) {
  return (
    <div className={`loader ${exiting ? "exit" : ""}`}>
      <div className="loader-bg-lines" />
      <div className="loader-panels">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="loader-panel" style={{ "--pi": i }} />
        ))}
      </div>
      <div className="loader-corners">
        <div className="loader-corner tl" />
        <div className="loader-corner tr" />
        <div className="loader-corner bl" />
        <div className="loader-corner br" />
      </div>
      <div className="loader-inner">
        <div className="loader-evoker">
          <div className="loader-ring r1" />
          <div className="loader-ring r2" />
          <div className="loader-ring r3" />
          <div className="loader-eye">
            <span className="loader-star">✦</span>
          </div>
        </div>
        <div className="loader-title">PORTFOLIO</div>
        <div className="loader-name">C.W. MANISAN</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-fill" />
        </div>
        <div className="loader-sub">// LOADING_</div>
      </div>
    </div>
  );
}

/* ─── PORTRAIT ─────────────────────────────────────────────────── */
function Portrait() {
  const runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ"];
  const positions = [
    { top: "15%", left: "-16px" }, { top: "30%", right: "-16px" },
    { top: "55%", left: "-14px" }, { top: "70%", right: "-14px" },
    { top: "85%", left: "10%" }, { top: "10%", right: "10%" },
  ];
  return (
    <div className="portrait-wrap">
      <div className="portrait-card">
        <div className="portrait-glow" />
        <div className="portrait-frame">
          <div className="portrait-header"></div>
          <div className="portraitimg">
            <img src={portraitimg} alt="Portrait" className="portrait-img-element" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="portrait-scanlines" />
          <div className="portrait-vignette" />
          <div className="portrait-footer"></div>
        </div>
        <div className="pc-corner tl" />
        <div className="pc-corner tr" />
        <div className="pc-corner bl" />
        <div className="pc-corner br" />
        {runes.map((r, i) => (
          <span key={i} className="rune" style={{ ...positions[i], "--ri": i }}>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN APP ─────────────────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaderExit, setLoaderExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaderExit(true), 2600);
    const t2 = setTimeout(() => setLoading(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const ids = NAV_ITEMS.map(n => n.toLowerCase().replace(/\s+/g, "-"));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveNav(NAV_ITEMS[i]); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((item) => {
    const id = item.toLowerCase().replace(/\s+/g, "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const shards = [...Array(12)].map((_, i) => ({
    left: `${(i * 7.5 + 5)}%`,
    height: `${40 + (i % 5) * 30}px`,
    "--sd": i,
  }));

  return (
    <>

      {loading && <Loader exiting={loaderExit} />}

      {/* BG */}
      <div className="app-bg" />
      <div className="app-bg-grid" />
      <div className="app-bg-scan" />
      <div className="app-bg-diag" />
      {shards.map((s, i) => (
        <div key={i} className="shard" style={s} />
      ))}

      {/* TOPBAR */}
      <div className="topbar">
        <div className="tb-left">
          <div className="tb-diamond" />
          <span className="tb-brand">C.W.M</span>
          <span className="tb-sep">//</span>
          <span className="tb-sub">PORTFOLIO SYS</span>
        </div>
        <div className="tb-dots">
          {[0,1,2,3,4].map(i => <span key={i} className="tb-dot" />)}
        </div>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* NAV */}
      <nav className={`nav-overlay ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        <div className="nav-bg-grid" />
        <div className="nav-header">
          <div className="nav-header-star">✦</div>
          <div className="nav-header-title">PORTFOLIO</div>
          <div className="nav-header-sub">— NAVIGATION MENU —</div>
        </div>
        <ul className="nav-list">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item} className="nav-item" style={{ "--ni": idx }}>
              <button
                className={`nav-btn ${activeNav === item ? "active" : ""}`}
                onClick={() => scrollTo(item)}
              >
                <div className="nb-diamond" />
                <span className="nb-num" style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
                  0{idx + 1}
                </span>
                <span>{item}</span>
                <span className="nb-arr">›</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-footer">
          <div className="nf-pulse" />
          <span>BOUND BY CONTRACT</span>
        </div>
      </nav>
      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      {/* ═══ MAIN ═══ */}
      <div className="main-content">

        {/* HERO */}
        <section id="home">
          <div className="hero-inner">
            <Portrait />
            <div className="hero-right">
              <div className="hero-eyebrow">
                <div className="he-line" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "3px", color: "var(--p3-pale)" }}>
                  BSIT — 2026
                </span>
                <div className="he-line" />
              </div>
              <div className="hero-name-block">
                <span className="hero-name-top">CHRISTIAN WILSON</span>
                <span className="hero-name-bottom">MANISAN</span>
              </div>
              <div className="hero-role">
                <div className="hr-d" />
                WEB DEVELOPER
                <div className="hr-d" />
              </div>
              <div className="hero-degree">
                Bachelor of Science in Information Technology
              </div>

              {/* Stats */}
              <div className="stat-panel">
                <div className="sp-header">
                  <div className="sp-header-d" />
                  PARAMETERS
                </div>
                {[["FRONTEND", 90], ["BACKEND", 50], ["HARDWARE", 60], ["SOFTWARE", 70]].map(([lbl, val], i) => (
                  <div key={lbl} className="sp-row" style={{ "--si": i }}>
                    <span className="sp-lbl">{lbl}</span>
                    <div className="sp-track">
                      <div className="sp-fill" style={{ "--sw": `${val}%` }} />
                      <div className="sp-segs">{[...Array(10)].map((_, j) => <div key={j} />)}</div>
                    </div>
                    <span className="sp-val">{val}</span>
                  </div>
                ))}
              </div>

              <div className="hero-btns">
                <button className="p3-btn primary" onClick={() => scrollTo("CONTACT")}>
                  <div className="p3-btn-d" />
                  CONTACT ME
                </button>
                <button className="p3-btn secondary" onClick={() => scrollTo("PROJECTS")}>
                  <div className="p3-btn-d" />
                  VIEW WORK
                </button>
              </div>

              <div className="hero-scroll">
                <div className="hs-line" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(0,170,255,0.4)", letterSpacing: "3px" }}>
                  SCROLL TO EXPLORE
                </span>
                <div className="hs-line" />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <Reveal>
            <SecHeader num="01" title="ABOUT ME" />
            <HudPanel>
              <p className="about-text">
                An aspiring developer driven by a passion for creating functional digital solutions and
                a commitment to mastering modern technology from the ground up. Inspired by sleek layouts
                and fluid, meaningful interactions — where form meets function.
              </p>
              <div className="trait-list">
                {["Problem Solver", "Detail-Oriented", "Fast Learner", "UI-Focused"].map(t => (
                  <span key={t} className="trait">
                    <span className="trait-d" />
                    {t}
                  </span>
                ))}
              </div>
            </HudPanel>
          </Reveal>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <Reveal>
            <SecHeader num="02" title="EDUCATION" />
          </Reveal>
          <div className="edu-stack">
            {EDUCATION_DATA.map((edu, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="edu-card">
                  <div className="edc-left">
                    <div className="edc-badge">{edu.roman}</div>
                    <div className="edc-line" />
                  </div>
                  <div className="edc-body">
                    <div className="edc-year">◆ {edu.year}</div>
                    <h3 className="edc-school">{edu.school}</h3>
                    <p className="edc-degree">{edu.degree}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section id="tech-stack">
          <Reveal>
            <SecHeader num="03" title="TECH STACK" />
          </Reveal>
          <div className="tech-grid">
            {TECH_STACK.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div className="tech-card" style={{ "--tc": t.color, "--ti": i }}>
                  <div className="tc-top">
                    <div className="tc-badge" style={{ "--tc": t.color }}>{t.initial}</div>
                    <div className="tc-info">
                      <span className="tc-name">{t.name}</span>
                      {t.sub && <span className="tc-sub">{t.sub}</span>}
                    </div>
                  </div>
                  <div className="tc-meter">
                    <div className="tc-track">
                      <div className="tc-fill" style={{ "--sw": `${t.value}%`, "--ti": i }} />
                      <div className="tc-segs">{[...Array(10)].map((_, j) => <div key={j} />)}</div>
                    </div>
                    <span className="tc-pct">{t.value}%</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <Reveal>
            <SecHeader num="04" title="PROJECTS" />
          </Reveal>
          <div className="projects-stack">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 150}>
                <div
                  className="proj-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => window.open(p.link, "_blank", "noopener,noreferrer")}
                  onKeyDown={e => e.key === "Enter" && window.open(p.link, "_blank", "noopener,noreferrer")}
                >
                  <div className="proj-left">
                    <div className="proj-num">{p.num}</div>
                    <div className="proj-arcana">{p.arcana}</div>
                  </div>
                  <div className="proj-body">
                    <h3 className="proj-title">{p.title}</h3>
                    <p className="proj-desc">{p.desc}</p>
                    <div className="proj-chips">
                      {p.tech.map(ch => <span key={ch} className="chip">{ch}</span>)}
                    </div>
                  </div>
                  <div className="proj-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications">
          <Reveal>
            <SecHeader num="05" title="CERTIFICATIONS" />
          </Reveal>
          <div className="cert-grid">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 90}>
                <div
                  className="cert-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedCert(cert)}
                  onKeyDown={e => e.key === "Enter" && setSelectedCert(cert)}
                >
                  <div className="cert-img-wrap">
                    <img src={cert.image} alt={cert.title} className="cert-img" />
                    <div className="cert-veil">◆ VIEW ◆</div>
                    <div className="cert-year-tag">{cert.year}</div>
                  </div>
                  <div className="cert-footer">
                    <div className="cert-footer-d" />
                    <span className="cert-title">{cert.title}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Reveal>
            <SecHeader num="06" title="CONTACT ME" />
            <HudPanel>
              <div className="contact-headline">
                <span className="ch-d">◆</span>
                LET'S BUILD SOMETHING GREAT
                <span className="ch-d">◆</span>
              </div>
              <div className="contact-links">
                <a href="mailto:christianmansian23@gmail.com" className="contact-link">
                  <div className="cl-icon">✉</div>
                  <div className="cl-body">
                    <span className="cl-lbl">EMAIL</span>
                    <span className="cl-val">christianmansian23@gmail.com</span>
                  </div>
                  <span className="cl-arr">◆</span>
                </a>
                <a href="https://github.com/bonmanisan" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <div className="cl-icon">⌥</div>
                  <div className="cl-body">
                    <span className="cl-lbl">GITHUB</span>
                    <span className="cl-val">github.com/bonmanisan</span>
                  </div>
                  <span className="cl-arr">◆</span>
                </a>
              </div>
            </HudPanel>
          </Reveal>
        </section>

        <footer className="footer">
          ◆ C.W. MANISAN © 2026 ◆
        </footer>
      </div>

      {/* CERT MODAL */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-year">◆ {selectedCert.year} ◆</span>
              <button className="modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            </div>
            <div className="modal-title">{selectedCert.title}</div>
            <div className="modal-img-wrap">
              <img src={selectedCert.image} alt={selectedCert.title} className="modal-img" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
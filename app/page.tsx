"use client";

import { type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    period: "Apr 2026 - Jun 2026",
    role: "System Engineer",
    organization: "Anyware Communication Co., Ltd.",
    place: "Songkhla, Thailand",
    summary: "Designed, configured, and supported network and system services for clients.",
    details: ["Deployed network devices and servers", "Troubleshot services to reduce downtime", "Produced diagrams, SOPs, and handover documentation"],
  },
  {
    period: "Sep 2025",
    role: "Competitor, Thailand Cyber Top Talent 2025",
    organization: "THCNA",
    place: "Bangkok, Thailand",
    summary: "Placed 6th nationally while solving live cybersecurity challenges as part of a blue team.",
    details: ["Penetration testing", "Capture-the-flag challenges", "Incident-response scenarios"],
  },
  {
    period: "Apr 2025 - May 2025",
    role: "Cybersecurity Intern",
    organization: "DiiS PSU",
    place: "Songkhla, Thailand",
    summary: "Supported security operations with hands-on technical tasks and clear operational documentation.",
    details: ["Monitored SIEM logs and alerts", "Investigated and escalated potential incidents", "Built runbooks and security checklists"],
  },
  {
    period: "Mar 2025 - Mar 2026",
    role: "President",
    organization: "International Relations Club, PSU",
    place: "Songkhla, Thailand",
    summary: "Led activities, workshops, and cultural exchanges for student engagement and collaboration.",
    details: ["Event planning", "Member engagement", "International collaboration"],
  },
];

const capabilities = [
  { title: "Systems", text: "Linux, server configuration, monitoring, documentation, and dependable operations." },
  { title: "Networks", text: "TCP/IP, network devices, infrastructure planning, troubleshooting, and deployment." },
  { title: "Security", text: "SIEM monitoring, vulnerability assessment, incident response, and blue-team thinking." },
  { title: "Build", text: "Python, C/C++, SQL, web development, AI tooling, and pragmatic automation." },
];

const projects = [
  { title: "TGAT / TPAT Course Website", period: "Year 1 · Semester 2", kind: "Web development", text: "An online course website for Thai university-admission preparation, built for the Web Development module.", href: "https://github.com/jkznx/My-Project-in-University/tree/main/Year_1/semester_2/mini_project", accent: "course" },
  { title: "CoE Lotto", period: "Year 2 · Semester 2", kind: "Cloud & Kubernetes", text: "A lottery-purchasing web application deployed to Kubernetes in the cloud for the Software Development Architecture module.", href: "https://github.com/jkznx/sda_final", accent: "cloud" },
  { title: "Pick and Pay", period: "Year 3 · Semester 1", kind: "Embedded systems", text: "A cashierless minimart prototype using ESP32, Arduino Uno, and ODROID hardware for the Embedded Systems module.", href: "https://github.com/jkznx/My-Project-in-University/tree/main/Year_3/semester_1", accent: "embedded" },
  { title: "URL Malware Predictive Classification", period: "Year 3 · Semester 1", kind: "Machine learning", text: "A machine-learning project for training a model to classify potentially malicious URLs.", href: "https://github.com/jkznx/My-Project-in-University/tree/main/Year_3/semester_1", accent: "ml" },
  { title: "Network Infrastructure", period: "Year 3 · Semester 2", kind: "Network security", text: "An enterprise network configuration project integrating Wazuh and Suricata for monitoring and security visibility.", href: "https://github.com/jkznx/My-Project-in-University/tree/main/Year_3/semester_2", accent: "network" },
  { title: "TOEIC Flashcard Python App", period: "Year 3 · Semester 2", kind: "Python application", text: "A B1-C2 vocabulary practice tool designed to support structured TOEIC preparation.", href: "https://github.com/jkznx?tab=repositories", accent: "toeic" },
  { title: "AI Ecosystem Workspace", period: "Year 4 · Semester 1", kind: "AI platform", text: "A workspace for time-series and non-time-series model training, then combining them into a practical AI ecosystem.", href: "https://github.com/jkznx/ai-ecosystem-workspace", accent: "ai" },
];

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CatPreloader({ onComplete }: { onComplete: () => void }) {
  return (
    <section className="preloader" aria-label="Loading portfolio" role="status">
      <div className="preloader-grid" aria-hidden="true"></div>
      <video className="cat-video" autoPlay muted playsInline preload="auto" onEnded={onComplete} aria-hidden="true">
        <source src="/cat-preloader.webm" type="video/webm" />
      </video>
      <div className="loader-copy"><p>Preparing the system</p><span></span></div>
      <button type="button" className="skip-loader" onClick={onComplete}>Skip intro</button>
    </section>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const [holdProgress, setHoldProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [systemArmed, setSystemArmed] = useState(false);
  const holdFrame = useRef<number | null>(null);
  const systemArmedRef = useRef(false);
  const dragState = useRef<{ card: HTMLAnchorElement; startX: number; moved: boolean } | null>(null);

  const stopHold = () => {
    if (holdFrame.current !== null) cancelAnimationFrame(holdFrame.current);
    holdFrame.current = null;
    setHolding(false);
    if (!systemArmedRef.current) setHoldProgress(0);
  };

  const beginHold = () => {
    if (systemArmedRef.current || holdFrame.current !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      systemArmedRef.current = true;
      setSystemArmed(true);
      setHoldProgress(100);
      return;
    }
    const startedAt = performance.now();
    setHolding(true);
    const advance = (now: number) => {
      const progress = Math.min(100, ((now - startedAt) / 900) * 100);
      setHoldProgress(progress);
      if (progress >= 100) {
        holdFrame.current = null;
        systemArmedRef.current = true;
        setHolding(false);
        setSystemArmed(true);
        return;
      }
      holdFrame.current = requestAnimationFrame(advance);
    };
    holdFrame.current = requestAnimationFrame(advance);
  };

  const handleHoldKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
      event.preventDefault();
      beginHold();
    }
  };

  const handleProjectPointerDown = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const card = event.currentTarget;
    card.setPointerCapture(event.pointerId);
    card.classList.add("is-dragging");
    dragState.current = { card, startX: event.clientX, moved: false };
  };

  const handleProjectPointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const drag = dragState.current;
    if (!drag || drag.card !== event.currentTarget) return;
    const distance = Math.max(-72, Math.min(72, event.clientX - drag.startX));
    if (Math.abs(distance) > 8) drag.moved = true;
    gsap.to(drag.card, { x: distance, duration: 0.22, ease: "power3.out", overwrite: "auto" });
  };

  const finishProjectDrag = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const drag = dragState.current;
    if (!drag || drag.card !== event.currentTarget) return;
    drag.card.classList.remove("is-dragging");
    drag.card.dataset.dragged = String(drag.moved);
    gsap.to(drag.card, { x: 0, duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    dragState.current = null;
    window.setTimeout(() => delete event.currentTarget.dataset.dragged, 0);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLoading(false); return; }
    const timer = window.setTimeout(() => setLoading(false), 7000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => {
    if (holdFrame.current !== null) cancelAnimationFrame(holdFrame.current);
  }, []);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    gsap.from("[data-intro]", { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
    gsap.from(".capability", { scrollTrigger: { trigger: ".capabilities", start: "top 78%" }, y: 36, opacity: 0, duration: 0.75, stagger: 0.12, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card) => {
      gsap.fromTo(card, { opacity: 0.25, scale: 0.94 }, { opacity: 1, scale: 1, scrollTrigger: { trigger: card, start: "top 84%", end: "bottom 46%", scrub: true } });
    });
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
      gsap.fromTo(card, { opacity: 0.16, x: 80, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.7, delay: index % 2 ? 0.08 : 0, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 86%", toggleActions: "play none none reverse" } });
    });
    gsap.to(".statement", { backgroundPositionX: "0%", ease: "none", scrollTrigger: { trigger: ".statement", start: "top 78%", end: "bottom 42%", scrub: true } });

    const magneticControls = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
    const cleanupMagnetic = magneticControls.map((control) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = control.getBoundingClientRect();
        gsap.to(control, { x: (event.clientX - bounds.left - bounds.width / 2) * 0.11, y: (event.clientY - bounds.top - bounds.height / 2) * 0.16, duration: 0.45, ease: "power3.out", overwrite: "auto" });
      };
      const reset = () => gsap.to(control, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
      const press = () => gsap.to(control, { scale: 0.96, duration: 0.16, ease: "power2.out", overwrite: "auto" });
      control.addEventListener("pointermove", move);
      control.addEventListener("pointerleave", reset);
      control.addEventListener("pointerdown", press);
      control.addEventListener("pointerup", reset);
      return () => {
        control.removeEventListener("pointermove", move);
        control.removeEventListener("pointerleave", reset);
        control.removeEventListener("pointerdown", press);
        control.removeEventListener("pointerup", reset);
      };
    });
    return () => cleanupMagnetic.forEach((cleanup) => cleanup());
  }, { scope: root });

  useEffect(() => {
    const nav = document.querySelector(".site-nav");
    const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {loading && <CatPreloader onComplete={() => setLoading(false)} />}
      <main ref={root} className="site-shell" aria-hidden={loading}>
      <a className="skip-link" href="#content">Skip to content</a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="brand" data-magnetic aria-label="Jukrachai Plongmai home">JP<span>.</span></a>
        <div className="nav-links">
          <a href="#work" data-magnetic>Experience</a><a href="#projects" data-magnetic>Projects</a><a href="#education" data-magnetic>Education</a>
        </div>
        <a className="nav-contact" data-magnetic href="mailto:jukrachai3146@gmail.com">Let&apos;s talk <Arrow /></a>
      </nav>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p data-intro className="availability">Open to systems, infrastructure, and security opportunities</p>
          <h1 id="hero-title" data-intro>Reliable systems.<br /><em>Calm under pressure.</em></h1>
          <p data-intro className="hero-summary">I&apos;m Jukrachai Plongmai, a Computer Engineering student building practical strength across network infrastructure, system operations, and cybersecurity.</p>
          <div data-intro className="hero-actions">
            <a className="button button-primary" data-magnetic href="#work">Explore my work <Arrow /></a>
            <a className="text-link" data-magnetic href="/Jukrachai_Plongmai_Resume.pdf" download>Download résumé</a>
            <a className="text-link" data-magnetic href="/Jukrachai_Plongmai_Transcript.pdf" download>Download transcript</a>
          </div>
        </div>
        <button data-intro type="button" className={`hero-panel hold-panel${systemArmed ? " is-armed" : ""}`} style={{ "--hold-progress": holdProgress / 100 } as CSSProperties} aria-pressed={systemArmed} aria-label="Hold to activate operations profile" onPointerDown={beginHold} onPointerUp={stopHold} onPointerCancel={stopHold} onKeyDown={handleHoldKeyDown} onKeyUp={stopHold}>
          <span className="signal" aria-hidden="true"><span></span><span></span><span></span></span>
          <span className="panel-location">Engineering student based in Thailand</span>
          <strong>Systems / Networks / Security</strong>
          <span className="hold-instruction">{systemArmed ? "Profile live" : holding ? "Keep holding…" : "Press and hold to arm profile"}</span>
          <span className="coordinate"><span>07°00&apos;N</span><span>{systemArmed ? "LIVE" : "100°29&apos;E"}</span></span>
        </button>
      </section>

      <section id="content" className="capabilities section-pad" aria-labelledby="capability-title">
        <div className="section-intro"><h2 id="capability-title">The work I&apos;m building toward.</h2><p>Technical detail is valuable only when it produces stable, understandable outcomes for the people depending on it.</p></div>
        <div className="capability-grid">
          {capabilities.map((item, index) => <article className={`capability capability-${index + 1}`} key={item.title}><span className="cap-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </section>

      <section id="work" className="work section-pad" aria-labelledby="work-title">
        <div className="work-heading"><h2 id="work-title">Experience shaped by the real world.</h2><p>Deployments, operations, and security work have taught me that good engineering is visible in the calm moments.</p></div>
        <div className="experience-list">
          {experience.map((item) => <article className="experience-card" key={item.role + item.organization}><div className="experience-period">{item.period}</div><div className="experience-main"><h3>{item.role}</h3><p className="organization">{item.organization} <span>{item.place}</span></p><p>{item.summary}</p><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}
        </div>
      </section>

      <section className="statement section-pad" aria-label="Professional approach"><p>I build with <strong>curiosity</strong>, document with <strong>clarity</strong>, and respond with <strong>discipline</strong>.</p></section>

      <section id="projects" className="projects section-pad" aria-labelledby="projects-title">
        <div className="projects-intro"><h2 id="projects-title">Seven builds across the engineering stack.</h2><p>From web products and cloud deployment to embedded systems, network defense, and applied machine learning.</p><a className="all-repos" data-magnetic href="https://github.com/jkznx?tab=repositories" target="_blank" rel="noreferrer">View all repositories <Arrow /></a></div>
        <div className="project-list">
          {projects.map((project) => <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.title} onPointerDown={handleProjectPointerDown} onPointerMove={handleProjectPointerMove} onPointerUp={finishProjectDrag} onPointerCancel={finishProjectDrag} onClick={(event) => { if (event.currentTarget.dataset.dragged === "true") event.preventDefault(); }}><div className={`project-orbit ${project.accent}`} aria-hidden="true"><span></span><span></span><span></span></div><div className="project-copy"><p className="project-period">{project.period}</p><h3>{project.title}</h3><p>{project.text}</p></div><div className="project-link"><span>{project.kind}</span><Arrow /></div></a>)}
        </div>
      </section>

      <section id="proof" className="proof section-pad" aria-labelledby="proof-title">
        <div><h2 id="proof-title">Proof should be easy to find.</h2><p>Use the résumé for the complete history, or explore the code and coursework that shaped my hands-on practice.</p></div>
        <div className="proof-links"><a data-magnetic href="/Jukrachai_Plongmai_Resume.pdf" download><span>Full résumé</span><Arrow /></a><a data-magnetic href="/Jukrachai_Plongmai_Transcript.pdf" download><span>Academic transcript</span><Arrow /></a><a data-magnetic href="https://github.com/jkznx/My-Project-in-University/" target="_blank" rel="noreferrer"><span>Selected work on GitHub</span><Arrow /></a></div>
      </section>

      <section id="education" className="education section-pad" aria-labelledby="education-title">
        <div><h2 id="education-title">Grounded in engineering fundamentals.</h2><p>Prince of Songkla University · B.Eng. Computer Engineering · Jun 2023 - Jun 2027</p></div>
        <div className="education-detail"><p>Relevant study spans computer networks, operating systems, cybersecurity, embedded systems, software architecture, and AI ecosystems.</p><p>Hands-on work includes networked embedded systems, security exercises, technical documentation, and test reports.</p></div>
      </section>

      <footer id="contact" className="footer"><p>Have a system, network, or security challenge in mind?</p><a data-magnetic href="mailto:jukrachai3146@gmail.com">jukrachai3146@gmail.com <Arrow /></a><div className="footer-meta"><span>Jukrachai Plongmai</span><a href="https://www.linkedin.com/in/jukrachai-plongmai-158533392/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/jkznx?tab=repositories" target="_blank" rel="noreferrer">All GitHub repositories</a><span>© {new Date().getFullYear()}</span></div></footer>
      </main>
    </>
  );
}

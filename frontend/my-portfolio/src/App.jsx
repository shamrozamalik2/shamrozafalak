import { useState, useEffect, useRef } from "react";
import logo from "../../../assets/Codebyshamroza.png";
import extension from "../../../assets/customExtension.png";
import customwidget from "../../../assets/StoreLocatorWidget.png";
import ghlActions from "../../../assets/ghlactions.png";
import automations from "../../../assets/automations.png";
import customwebsites from "../../../assets/websites.jpg";

/* ============================================================
   GLOBAL STYLES injected into <head> via a style tag
   (Syne + DM Sans fonts, CSS variables, keyframes, resets)
============================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }

    :root {
      --bg-primary: #0a0a0f;
      --bg-secondary: #111118;
      --bg-card: #16161f;
      --text-primary: #f0effe;
      --text-secondary: #9896b8;
      --text-muted: #5c5b7a;
      --accent: #7c6df0;
      --accent-bright: #a08fff;
      --accent-dim: rgba(124,109,240,0.15);
      --accent-glow: rgba(124,109,240,0.25);
      --green: #4ade80;
      --border: rgba(124,109,240,0.15);
      --border-hover: rgba(124,109,240,0.4);
      --radius: 16px;
      --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    [data-theme="light"] {
      --bg-primary: #f5f4ff;
      --bg-secondary: #ebebff;
      --bg-card: #ffffff;
      --text-primary: #0f0e1a;
      --text-secondary: #4a4870;
      --text-muted: #9896b8;
      --accent: #6355e8;
      --accent-bright: #7c6df0;
      --accent-dim: rgba(99,85,232,0.12);
      --accent-glow: rgba(99,85,232,0.15);
      --green: #16a34a;
      --border: rgba(99,85,232,0.15);
      --border-hover: rgba(99,85,232,0.4);
    }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.7;
      overflow-x: hidden;
      transition: background var(--transition), color var(--transition);
    }
    body::before {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 0; opacity: 0.4;
    }
    h1,h2,h3,h4 { font-family: 'Syne', sans-serif; line-height: 1.1; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }

    /* ---------- Keyframes ---------- */
    @keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes gradShift{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes pulseGlow{ 0%,100%{box-shadow:0 0 8px var(--green)} 50%{box-shadow:0 0 20px var(--green)} }
    @keyframes barFill  { from{width:0} to{width:var(--w)} }

    /* ---------- Reveal on scroll ---------- */
    .reveal        { opacity:0; transform:translateY(32px); transition:opacity .7s ease,transform .7s ease; }
    .reveal-left   { opacity:0; transform:translateX(-32px);transition:opacity .7s ease,transform .7s ease; }
    .reveal.visible,.reveal-left.visible { opacity:1; transform:none; }
    .d1{transition-delay:.1s} .d2{transition-delay:.2s}
    .d3{transition-delay:.3s} .d4{transition-delay:.4s}
    .d5{transition-delay:.5s}

    /* ---------- Shared layout ---------- */
    .container { max-width:1120px; margin:0 auto; padding:0 24px; }
    .section   { padding:100px 0; position:relative; }
    .section-label {
      display:inline-flex; align-items:center; gap:8px;
      font-size:.75rem; font-weight:600; letter-spacing:.15em;
      text-transform:uppercase; color:var(--accent-bright); margin-bottom:16px;
    }
    .section-label::before { content:''; width:20px; height:2px; background:var(--accent); }
    .section-title { font-size:clamp(2rem,4vw,3rem); font-weight:800; margin-bottom:16px; }
    .section-sub   { color: var(--text-secondary);
    max-width: 560px;
    font-size: 1.05rem;
    text-align: center;
    align-items: center;
    display: contents; }
    .section-header{ margin-bottom:60px; }

    /* ---------- Buttons ---------- */
    .btn {
      display:inline-flex; align-items:center; gap:8px;
      padding:12px 24px; border-radius:10px; font-weight:600;
      font-size:.9rem; cursor:pointer; border:none;
      transition:all var(--transition); position:relative; overflow:hidden;
      font-family:'DM Sans',sans-serif;
    }
    .btn::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,.1); opacity:0; transition:opacity var(--transition); }
    .btn:hover::before { opacity:1; }
    .btn-primary { background:var(--accent); color:#fff; box-shadow:0 4px 20px var(--accent-glow); }
    .btn-primary:hover { background:var(--accent-bright); box-shadow:0 6px 30px rgba(124,109,240,.4); transform:translateY(-2px); }
    .btn-ghost   { background:transparent; color:var(--text-secondary); border:1px solid var(--border); }
    .btn-ghost:hover { border-color:var(--accent); color:var(--accent-bright); transform:translateY(-2px); }
    .btn-sm { padding:8px 16px; font-size:.82rem; border-radius:8px; }

    /* ---------- Navbar ---------- */
    #navbar {
      position:fixed; top:0; left:0; right:0; z-index:1000;
      padding:20px 0; background:transparent;
      transition:background var(--transition),padding var(--transition),box-shadow var(--transition);
    }
    #navbar.scrolled {
      background:rgba(10,10,15,.85); backdrop-filter:blur(20px);
      padding:14px 0; box-shadow:0 1px 0 var(--border);
    }
    [data-theme="light"] #navbar.scrolled { background:rgba(245,244,255,.85); }
    .nav-inner  { display:flex; align-items:center; justify-content:space-between; }
    .nav-logo   { font-family:'Syne',sans-serif; font-weight:800; font-size:1.25rem;
                  background:linear-gradient(135deg,var(--accent-bright),#c4b5fd);
                  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
                  .nav-logo img {
  height: 77px;   /* adjust as needed */
  width: auto;
  display: block;
}
    .nav-links  { display:flex; align-items:center; gap:36px; list-style:none; }
    .nav-links a { font-size:.9rem; font-weight:500; color:var(--text-secondary);
                   transition:color var(--transition); position:relative; }
    .nav-links a::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px;
                          background:var(--accent); transition:width var(--transition); border-radius:2px; }
    .nav-links a:hover { color:var(--text-primary); }
    .nav-links a:hover::after { width:100%; }
    .nav-actions { display:flex; align-items:center; gap:12px; }
    #theme-toggle {
      width:40px; height:40px; border-radius:10px; border:1px solid var(--border);
      background:var(--bg-card); color:var(--text-secondary); cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:all var(--transition); font-size:1rem;
    }
    #theme-toggle:hover { background:var(--accent); color:#fff; border-color:var(--accent); }
    #menu-toggle {
      display:none; width:40px; height:40px; border-radius:10px;
      border:1px solid var(--border); background:var(--bg-card);
      color:var(--text-secondary); cursor:pointer;
      align-items:center; justify-content:center; font-size:1.1rem;
    }
    #mobile-nav {
      display:none; position:fixed; inset:0; background:var(--bg-primary);
      z-index:999; flex-direction:column; align-items:center;
      justify-content:center; gap:36px; opacity:0; transition:opacity .3s ease;
    }
    #mobile-nav.open { display:flex; opacity:1; }
    #mobile-nav a { font-family:'Syne',sans-serif; font-size:2rem; font-weight:700;
                    color:var(--text-secondary); transition:color var(--transition); }
    #mobile-nav a:hover { color:var(--accent-bright); }
    #close-menu {
      position:absolute; top:24px; right:24px; width:40px; height:40px;
      border-radius:10px; border:1px solid var(--border); background:var(--bg-card);
      color:var(--text-secondary); cursor:pointer; display:flex;
      align-items:center; justify-content:center; font-size:1.1rem;
    }

    /* ---------- Hero ---------- */
    #hero { min-height:100vh; display:flex; align-items:center;
            position:relative; overflow:hidden; padding:120px 0 80px; }
    .orb  { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
    .orb-1 { width:500px;height:500px; background:radial-gradient(circle,rgba(124,109,240,.15),transparent 70%);
              top:-100px;right:-100px; animation:float 8s ease-in-out infinite; }
    .orb-2 { width:350px;height:350px; background:radial-gradient(circle,rgba(196,181,253,.08),transparent 70%);
              bottom:0;left:-80px; animation:float 10s ease-in-out infinite reverse; }
    .orb-3 { width:200px;height:200px; background:radial-gradient(circle,rgba(74,222,128,.06),transparent 70%);
              top:40%;left:40%; animation:float 6s ease-in-out infinite 2s; }
    .hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:60px;
                  align-items:center; position:relative; z-index:1; }
    .hero-badge {
      display:inline-flex; align-items:center; gap:8px;
      background:var(--bg-card); border:1px solid var(--border);
      border-radius:100px; padding:6px 14px 6px 8px; font-size:.8rem;
      color:var(--text-secondary); margin-bottom:24px;
      animation:fadeIn .6s ease forwards;
    }
    .hero-badge .dot { width:8px;height:8px;border-radius:50%;background:var(--green);
                       animation:pulseGlow 2s ease infinite; }
    .hero-name { font-size:clamp(2.8rem,6vw,5rem); font-weight:800; letter-spacing:-.03em;
                 line-height:1; margin-bottom:16px; animation:fadeUp .7s ease .1s both; }
    .hero-name span { background:linear-gradient(135deg,var(--accent-bright) 0%,#c4b5fd 50%,#e0d9ff 100%);
                      background-size:200% 200%;
                      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
                      animation:gradShift 4s ease infinite; }
    .hero-title { font-size:1.1rem; font-weight:500; color:var(--text-secondary);
                  margin-bottom:20px; animation:fadeUp .7s ease .2s both; }
    .hero-typed { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:700;
                  color:var(--accent-bright); margin-bottom:24px; min-height:2rem;
                  animation:fadeUp .7s ease .25s both; }
    .typed-cursor { display:inline-block; animation:blink .9s step-end infinite; color:var(--accent); }
    .hero-desc  { font-size:1.05rem; color:var(--text-secondary); line-height:1.75;
                  margin-bottom:36px; animation:fadeUp .7s ease .3s both; }
    .hero-cta   { display:flex; gap:12px; flex-wrap:wrap; animation:fadeUp .7s ease .4s both; }
    .hero-visual{ position:relative; display:flex; align-items:center;
                  justify-content:center; animation:fadeIn .8s ease .5s both; }
    .hero-img-glow { position:absolute; width:420px; height:420px; border-radius:50%;
      background:radial-gradient(circle at 50% 60%,rgba(124,109,240,.35) 0%,rgba(196,181,253,.15) 45%,transparent 70%);
      filter:blur(40px); z-index:0; pointer-events:none; }
    .hero-img-ring { position:absolute; width:400px; height:400px; border-radius:50%;
      border:1.5px dashed rgba(124,109,240,.25); animation:spin 18s linear infinite; z-index:1; }
    .hero-img-ring::before { content:''; position:absolute; top:-5px; left:50%;
      transform:translateX(-50%); width:10px; height:10px; border-radius:50%;
      background:var(--accent-bright); box-shadow:0 0 12px var(--accent); }
    .hero-img-wrap { position:relative; z-index:2; animation:float 6s ease-in-out infinite; }
    .hero-photo { width:320px; height:400px; object-fit:cover; object-position:top center;
      border-radius:220px 220px 180px 180px; display:block;
      filter:drop-shadow(0 20px 60px rgba(124,109,240,.4)) drop-shadow(0 4px 20px rgba(0,0,0,.5)); }
    .tech-badge { position:absolute; background:var(--bg-card); border:1px solid var(--border);
      border-radius:12px; padding:8px 14px; display:flex; align-items:center; gap:8px;
      font-size:.82rem; font-weight:600; color:var(--text-primary);
      backdrop-filter:blur(10px); z-index:3; box-shadow:0 8px 40px rgba(0,0,0,.5); }
    .tech-badge i { color:var(--accent-bright); }
    .tb1 { top:8%;  right:-77px; animation:float 5s ease-in-out infinite .5s; }
    .tb2 { bottom:41%; left:-177px; animation:float 7s ease-in-out infinite 1s; }
    .tb3 { top:48%; right:-153px; animation:float 6s ease-in-out infinite 1.5s; }
    .scroll-indicator { display:flex; flex-direction:column; align-items:center; gap:8px;
      color:var(--text-muted); font-size:.75rem; letter-spacing:.1em;
      text-transform:uppercase; margin-top:60px; animation:fadeIn 1s ease 1s both; }
    .scroll-line { width:1px; height:40px;
      background:linear-gradient(to bottom,var(--accent),transparent);
      animation:float 2s ease-in-out infinite; }

    /* ---------- About ---------- */
    .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
    .about-card { background:var(--bg-card); border:1px solid var(--border);
      border-radius:var(--radius); padding:32px; position:relative; overflow:hidden; }
    .about-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg,var(--accent),#c4b5fd); }
    .about-stats { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:32px; }
    .stat-box { background:var(--bg-card); border:1px solid var(--border); border-radius:12px;
      padding:20px; text-align:center; transition:all var(--transition); }
    .stat-box:hover { border-color:var(--accent); transform:translateY(-4px);
      box-shadow:0 8px 30px var(--accent-glow); }
    .stat-number { font-family:'Syne',sans-serif; font-size:2rem; font-weight:800;
      color:var(--accent-bright); display:block; }
    .stat-label  { font-size:.82rem; color:var(--text-muted); margin-top:4px; }
    .about-text p { color:var(--text-secondary); margin-bottom:20px; font-size:1.02rem; }
    .about-hi { color:var(--accent-bright); font-weight:500; }
    .tag { background:var(--accent-dim); color:var(--accent-bright); padding:5px 12px;
           border-radius:100px; font-size:.8rem; font-weight:600;
           transition:all var(--transition); display:inline-block; }
    .tag:hover { background:var(--accent); color:#fff; transform:scale(1.05); }
    .tags-wrap { display:flex; flex-wrap:wrap; gap:8px; margin-top:20px; }

    /* ---------- Skills ---------- */
    .skills-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:24px; }
    .skill-card  { background:var(--bg-card); border:1px solid var(--border);
      border-radius:var(--radius); padding:28px; transition:all var(--transition); }
    .skill-card:hover { border-color:var(--border-hover); transform:translateY(-6px);
      box-shadow:0 16px 40px rgba(0,0,0,.3),0 0 0 1px var(--border-hover); }
    .skill-head  { display:flex; align-items:center; gap:14px; margin-bottom:20px; }
    .skill-icon  { width:48px;height:48px; border-radius:12px; background:var(--accent-dim);
      display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
    .skill-name  { font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; }
    .skill-cat   { font-size:.78rem; color:var(--text-muted); margin-top:2px; }
    .bar-row     { margin-top:8px; }
    .bar-label   { display:flex; justify-content:space-between; margin-bottom:8px;
      font-size:.82rem; color:var(--text-secondary); }
    .bar-label span:last-child { color:var(--accent-bright); font-weight:600; }
    .bar-track   { height:5px; background:var(--bg-secondary); border-radius:100px; overflow:hidden; }
    .bar-fill    { height:100%; border-radius:100px;
      background:linear-gradient(90deg,var(--accent),var(--accent-bright));
      width:0; transition:width 1.2s cubic-bezier(.4,0,.2,1); }

    /* ---------- Projects ---------- */
    .projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:24px; }
    .proj-card { background:var(--bg-card); border:1px solid var(--border);
      border-radius:var(--radius); overflow:hidden; transition:all var(--transition);
      display:flex; flex-direction:column; }
    .proj-card:hover { border-color:var(--border-hover); transform:translateY(-8px);
      box-shadow:0 24px 60px rgba(0,0,0,.4); }
    .proj-img { position:relative; height:200px; overflow:hidden; background:var(--bg-secondary); }
    .proj-placeholder { width:100%;height:100%; display:flex; align-items:center;
      justify-content:center; font-size:3rem; }
      .proj-placeholder {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.proj-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.proj-card:hover .proj-image {
  transform: scale(1.05);
}
    .proj-overlay { position:absolute; inset:0; background:rgba(0,0,0,.5);
      display:flex; align-items:center; justify-content:center; gap:12px;
      opacity:0; transition:opacity var(--transition); }
    .proj-card:hover .proj-overlay { opacity:1; }
    .proj-body  { padding:24px; flex:1; display:flex; flex-direction:column; }
    .proj-title { font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:700; margin-bottom:10px; }
    .proj-desc  { color:var(--text-secondary); font-size:.9rem; line-height:1.65; flex:1; margin-bottom:20px; }
    .stack-wrap { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px; }
    .stack-tag  { background:rgba(124,109,240,.1); border:1px solid rgba(124,109,240,.2);
      color:var(--accent-bright); padding:3px 10px; border-radius:6px; font-size:.75rem; font-weight:600; }
    .proj-links { display:flex; gap:10px; }

    .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  position: relative;
  background: #111;
  padding: 10px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
}

.modal-content img {
  width: 100%;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: 7px;
  right: 5px;
  background: crimson;
  border: none;
  color: white;
  font-size: 16px;
  padding: 6px 10px;
  border-radius: 50%;
  cursor: pointer;
}

    /* ---------- Services ---------- */
    .services-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
    .svc-card { background:var(--bg-card); border:1px solid var(--border);
      border-radius:var(--radius); padding:36px 28px; text-align:center;
      transition:all var(--transition); position:relative; overflow:hidden; }
    .svc-card::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
      width:0; height:3px; background:linear-gradient(90deg,var(--accent),#c4b5fd);
      transition:width var(--transition); border-radius:2px; }
    .svc-card:hover { transform:translateY(-8px); box-shadow:0 20px 50px rgba(0,0,0,.3); }
    .svc-card:hover::after { width:100%; }
    .svc-icon { width:72px;height:72px; border-radius:20px; background:var(--accent-dim);
      border:1px solid rgba(124,109,240,.2); display:flex; align-items:center;
      justify-content:center; font-size:1.8rem; margin:0 auto 24px;
      transition:all var(--transition); }
    .svc-card:hover .svc-icon { background:var(--accent); color:#fff;
      border-color:var(--accent); box-shadow:0 8px 24px var(--accent-glow); }
    .svc-title { font-family:'Syne',sans-serif; font-size:1.15rem; font-weight:700; margin-bottom:12px; }
    .svc-desc  { color:var(--text-secondary); font-size:.92rem; line-height:1.7; }
    .svc-list  { list-style:none; margin-top:16px; text-align:left; }
    .svc-list li { color:var(--text-secondary); font-size:.85rem; padding:5px 0;
      display:flex; align-items:center; gap:8px; }
    .svc-list li::before { content:''; width:6px;height:6px; border-radius:50%;
      background:var(--accent); flex-shrink:0; }

    /* ---------- Contact ---------- */
    .contact-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:60px; align-items:start; }
    .contact-info h3 { font-size:1.5rem; font-weight:700; margin-bottom:16px; }
    .contact-info p  { color:var(--text-secondary); font-size:.98rem; line-height:1.75; margin-bottom:32px; }
    .c-item { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
    .c-icon  { width:44px;height:44px; border-radius:12px; background:var(--accent-dim);
      border:1px solid rgba(124,109,240,.2); display:flex; align-items:center;
      justify-content:center; color:var(--accent-bright); font-size:1rem; flex-shrink:0; }
    .c-text span { display:block; font-size:.78rem; color:var(--text-muted);
      margin-bottom:2px; text-transform:uppercase; letter-spacing:.08em; }
    .c-text a,.c-text p { color:var(--text-primary); font-size:.92rem; font-weight:500;
      margin:0; transition:color var(--transition); }
    .c-text a:hover { color:var(--accent-bright); }
    .social-links { display:flex; gap:10px; margin-top:28px; }
    .soc-link { width:44px;height:44px; border-radius:12px; background:var(--bg-card);
      border:1px solid var(--border); display:flex; align-items:center; justify-content:center;
      color:var(--text-secondary); font-size:1.05rem; transition:all var(--transition); }
    .soc-link:hover { background:var(--accent); color:#fff; border-color:var(--accent);
      transform:translateY(-3px); box-shadow:0 6px 20px var(--accent-glow); }
    .c-form { background:var(--bg-card); border:1px solid var(--border);
      border-radius:var(--radius); padding:36px; }
    .form-row2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .form-grp { margin-bottom:20px; }
    .form-grp label { display:block; font-size:.82rem; font-weight:600; color:var(--text-secondary);
      margin-bottom:8px; text-transform:uppercase; letter-spacing:.06em; }
    .form-grp input,.form-grp textarea {
      width:100%; background:var(--bg-secondary); border:1px solid var(--border);
      border-radius:10px; padding:12px 16px; color:var(--text-primary);
      font-family:'DM Sans',sans-serif; font-size:.95rem;
      transition:all var(--transition); outline:none; resize:none;
    }
    .form-grp input::placeholder,.form-grp textarea::placeholder { color:var(--text-muted); }
    .form-grp input:focus,.form-grp textarea:focus { border-color:var(--accent);
      box-shadow:0 0 0 3px var(--accent-glow); }
    .form-grp textarea { min-height:130px; }
    .form-success { display:none; text-align:center; padding:16px;
      background:rgba(74,222,128,.1); border:1px solid rgba(74,222,128,.3);
      border-radius:10px; color:var(--green); font-weight:600; margin-top:16px; }
    .form-success.show { display:block; }

    /* ---------- Footer ---------- */
    footer { background:var(--bg-primary); border-top:1px solid var(--border); padding:40px 0; }
    .foot-inner { display:flex; align-items:center; justify-content:space-between;
      flex-wrap:wrap; gap:16px; }
    .foot-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem;
      background:linear-gradient(135deg,var(--accent-bright),#c4b5fd);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .foot-copy { font-size:.85rem; color:var(--text-muted); }
    .foot-links { display:flex; gap:20px; }
    .foot-links a { font-size:.85rem; color:var(--text-muted); transition:color var(--transition); }
    .foot-links a:hover { color:var(--accent-bright); }

    /* ---------- Scroll-to-top ---------- */
    #scroll-top {
      position:fixed; bottom:28px; right:28px; width:46px; height:46px;
      border-radius:12px; background:var(--accent); color:#fff; border:none;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      font-size:1rem; opacity:0; transform:translateY(20px);
      transition:all var(--transition); z-index:900;
      box-shadow:0 4px 20px var(--accent-glow);
    }
    #scroll-top.visible { opacity:1; transform:translateY(0); }
    #scroll-top:hover   { background:var(--accent-bright); transform:translateY(-3px); }

    /* ---------- Responsive ---------- */
    @media(max-width:900px){
      .hero-inner { grid-template-columns:1fr; text-align:center; gap:40px; }
      .hero-cta   { justify-content:center; }
      .hero-visual{ order:1; }
      .hero-content{ order:0; }
      .hero-photo { width:240px; height:300px; }
      .hero-img-glow,.hero-img-ring { width:280px; height:280px; }
      .tb1,.tb3   { display:none; }
      .tb2        { left:50%; transform:translateX(-50%); bottom:-16px; }
      .about-grid { grid-template-columns:1fr; gap:40px; }
      .contact-grid{ grid-template-columns:1fr; }
    }
    @media(max-width:768px){
      .section    { padding:70px 0; }
      .nav-links  { display:none; }
      #menu-toggle{ display:flex; }
      .form-row2  { grid-template-columns:1fr; }
      .projects-grid{ grid-template-columns:1fr; }
    }
    @media(max-width:480px){
      .about-stats{ grid-template-columns:1fr 1fr; }
      .hero-photo { width:200px; height:250px; }
      .hero-img-ring,.hero-img-glow { width:230px; height:230px; }
      .c-form     { padding:24px; }
    }
  `}</style>
);

/* ============================================================
   CUSTOM HOOKS
============================================================ */

// Typed text effect
function useTyped(phrases) {
  const [display, setDisplay] = useState("");
  const state = useRef({ pi: 0, ci: 0, del: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { pi, ci, del } = state.current;
      const cur = phrases[pi];
      if (del) {
        state.current.ci = ci - 1;
        setDisplay(cur.slice(0, ci - 1));
        if (ci - 1 === 0) {
          state.current.del = false;
          state.current.pi = (pi + 1) % phrases.length;
          timer = setTimeout(tick, 400);
        } else { timer = setTimeout(tick, 50); }
      } else {
        state.current.ci = ci + 1;
        setDisplay(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) {
          state.current.del = true;
          timer = setTimeout(tick, 1800);
        } else { timer = setTimeout(tick, 90); }
      }
    }
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

  return display;
}

// Scroll reveal
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Skill bar animation
function useSkillBars() {
  useEffect(() => {
    const cards = document.querySelectorAll(".skill-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".bar-fill").forEach((f) => {
            f.style.width = f.dataset.width + "%";
          });
      }),
      { threshold: 0.3 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
}

/* ============================================================
   COMPONENTS
============================================================ */

/* ----- Navbar ----- */
function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = () => { setMenuOpen(false); document.body.style.overflow = ""; };
  const open = () => { setMenuOpen(true); document.body.style.overflow = "hidden"; };

  const links = ["about", "skills", "projects", "services", "contact"];

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-inner">
            {/* <a href="#" className="nav-logo">SM.</a> */}
            <a href="#" className="nav-logo">
              <img src={logo} alt="SM Logo" />
            </a>
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l}><a href={`#${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
              ))}
            </ul>
            <div className="nav-actions">
              <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                <i className={`fa-solid fa-${theme === "dark" ? "moon" : "sun"}`}></i>
              </button>
              <button id="menu-toggle" onClick={open} aria-label="Open menu">
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div id="mobile-nav" className={menuOpen ? "open" : ""} role="dialog" aria-modal="true">
        <button id="close-menu" onClick={close}><i className="fa-solid fa-xmark"></i></button>
        {links.map((l) => (
          <a key={l} href={`#${l}`} onClick={close}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
      </div>
    </>
  );
}

/* ----- Hero ----- */
function Hero() {
  const typed = useTyped([
    "Building Scalable APIs.",
    "MERN Stack Developer.",
    "Backend Enthusiast.",
    "Problem Solver.",
    "Open to Opportunities.",
  ]);

  return (
    <section id="hero">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="container">
        <div className="hero-inner">

          {/* LEFT — Text */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span>
              Available for freelance &amp; internships
            </div>

            <h1 className="hero-name">
              Shamroza's<br /><span>Code</span>
            </h1>

            <p className="hero-title">MERN Stack Developer &nbsp;·&nbsp; #Software Engineerer</p>

            <div className="hero-typed" aria-live="polite">
              <span>{typed}</span>
              <span className="typed-cursor">|</span>
            </div>

            <p className="hero-desc">
              Building fast, scalable, and efficient web applications using MongoDB, <br />
              Express.js, React.js, and Node.js. Focused on creating powerful REST APIs, smooth <br />
              user interfaces, and reliable backend systems with clean, maintainable code.
            </p>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                <i className="fa-solid fa-rocket"></i> View Projects
              </a>
              <a href="#contact" className="btn btn-ghost">
                <i className="fa-solid fa-envelope"></i> Get In Touch
              </a>
            </div>

            <div className="scroll-indicator">
              <div className="scroll-line"></div>
              <span>Scroll</span>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="hero-visual">
            <div className="hero-img-glow"></div>
            <div className="hero-img-ring"></div>
            <div className="hero-img-wrap">
              <img
                src="https://i.postimg.cc/brVXYfPH/shamroza-removebg-preview.png"
                alt="Shamroza Malik"
                className="hero-photo"
              />
            </div>
            <div className="tech-badge tb1"><i className="fa-brands fa-node-js"></i> Node.js</div>
            <div className="tech-badge tb2"><i className="fa-solid fa-database"></i> MongoDB</div>
            <div className="tech-badge tb3"><i className="fa-brands fa-react"></i> React</div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ----- About ----- */
function About() {
  const stats = [
    { n: "3+", l: "Years Coding" },
    { n: "10+", l: "Projects Built" },
    { n: "30+", l: "Third party Integrations of apps" },
    { n: "∞", l: "Lines of Code" },
  ];
  const tags = [ "REST APIs", "MongoDB", "Node.js", "Express.js", "React", "Automation", "Open Source", "frameworks: Bootstrap, Tailwind CSS, Vite etc"];

  return (
    <section id="about" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="about-grid">

          {/* Left — card + stats */}
          <div className="reveal-left">
            <div className="about-card">
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{
                  width: 100, height: 100, borderRadius: "50%",
                  background: "linear-gradient(135deg,var(--accent-dim),var(--bg-secondary))",
                  border: "3px solid var(--border)", display: "inline-flex",
                  alignItems: "center", justifyContent: "center",
                  fontFamily: "'Syne',sans-serif", fontSize: "2.5rem", fontWeight: 800,
                  color: "var(--accent-bright)"
                }}>SM</div>
              </div>
              <p style={{
                textAlign: "center", color: "var(--text-muted)", fontSize: ".82rem",
                textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4
              }}>Software Engineer</p>
              <p style={{
                textAlign: "center", color: "var(--accent-bright)", fontWeight: 700,
                fontSize: "1.1rem", fontFamily: "'Syne',sans-serif"
              }}>Shamroza Malik</p>
            </div>

            <div className="about-stats">
              {stats.map((s, i) => (
                <div key={s.l} className={`stat-box reveal d${i + 1}`}>
                  <span className="stat-number">{s.n}</span>
                  <span className="stat-label">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — text */}
          {/* Right — text */}
          <div className="about-text reveal">
            <div className="section-label">About Me</div>

            <h2 className="section-title">
              Crafting Full-Stack Digital Experiences
            </h2>

            <p>
              Hi! I'm <span className="about-hi">Shamroza Falak</span>, a MERN Stack Developer and Software Engineering student
              focused on building complete digital solutions—from scalable web applications to Chrome extensions and custom UI widgets.
            </p>

            <p>
              My core stack includes <span className="about-hi">Node.js + Express</span> for backend development,
              <span className="about-hi">MongoDB</span> for flexible data modeling, and <span className="about-hi">React</span> for modern, responsive user interfaces.
              I also enjoy working on <span className="about-hi">third-party integrations</span> such as payment gateways, webhooks, cloud services, and automation workflows, along with experience in <span className="about-hi">GoHighLevel (GHL)</span>.
            </p>

            <p>
              Outside of development, I enjoy experimenting with new technologies and building side projects like Chrome extensions and custom widgets.
              My goal is to join a forward-thinking team where I can grow, contribute, and help build impactful products.
            </p>

            <div className="tags-wrap">
              {tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn-primary">
                <i className="fa-solid fa-paper-plane"></i> Hire Me
              </a>

              {/* <a href="#" className="btn btn-ghost" download>
                <i className="fa-solid fa-download"></i> Download CV
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Skills ----- */
function Skills() {
  const cards = [
    {
      icon: "fa-brands fa-react", color: "#61dafb", name: "React.js", cat: "Frontend Framework",
      bars: [{ l: "Component Design & State Mgmt", w: 80 }, { l: "React Router & Hooks", w: 85 }]
    },
    {
      icon: "fa-brands fa-node-js", color: "#68a063", name: "Node.js", cat: "Runtime Environment",
      bars: [{ l: "REST API Development", w: 90 }, { l: "Auth & Middleware", w: 88 }]
    },
    {
      icon: "fa-solid fa-server", color: "#f5a623", name: "Express.js", cat: "Web Framework",
      bars: [{ l: "Routing & Controllers", w: 92 }, { l: "Error Handling & Validation", w: 87 }]
    },
    {
      icon: "fa-solid fa-database", color: "#4db33d", name: "MongoDB", cat: "NoSQL Database",
      bars: [{ l: "Schema Design & Mongoose", w: 88 }, { l: "Aggregation & Indexing", w: 78 }]
    },
    {
      icon: "fa-solid fa-plug", color: "#ff6b35", name: "API Integration", cat: "Third-Party Services",
      bars: [{ l: "Payment & Auth APIs", w: 85 }, { l: "Webhooks & Cloud APIs", w: 82 }]
    },
    {
      icon: "fa-brands fa-git-alt", color: "#e44d26", name: "Tools & DevOps", cat: "Workflow",
      bars: [{ l: "Git & GitHub", w: 90 }, { l: "Docker & Deployment", w: 65 }]
    },
  ];

  return (
    <section id="skills" className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Skills</div>
          <h2 className="section-title">My Technical Arsenal</h2>
          <p className="section-sub">A curated set of technologies I wield daily to build fast, reliable full-stack applications.</p>
        </div>

        <div className="skills-grid">
          {cards.map((c, i) => (
            <div key={c.name} className={`skill-card reveal d${(i % 3) + 1}`}>
              <div className="skill-head">
                <div className="skill-icon" style={{ color: c.color }}>
                  <i className={c.icon}></i>
                </div>
                <div>
                  <div className="skill-name">{c.name}</div>
                  <div className="skill-cat">{c.cat}</div>
                </div>
              </div>
              {c.bars.map((b) => (
                <div key={b.l} className="bar-row">
                  <div className="bar-label"><span>{b.l}</span><span>{b.w}%</span></div>
                  <div className="bar-track">
                    <div className="bar-fill" data-width={b.w}></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Projects ----- */
function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);
  const projects = [
    {
      img: customwidget,
      bg: "linear-gradient(135deg,#1a1a2e,#16213e)",
      title: "Editable UI Widget",
      desc: "A customizable widget that allows users to modify content, colors, and layout in real time. Designed for flexibility and user control, making it ideal for dynamic and personalized web interfaces.",
      stack: ["React.js", "MongoDB", "Node.js", "HTML/CSS/JS"],
      github: "https://github.com/shamrozamalik2",
    },
    {
      img: extension,
      bg: "linear-gradient(135deg,#0d2137,#0a3d62)",
      title: "Custom Chrome Extensions",
      desc: "Development of fully functional Chrome extensions tailored to user needs, including automation tools, UI enhancements, and workflow optimization features with real-world usability.",
      stack: ["JavaScript", "Chrome APIs", "HTML/CSS", "Node.js"],
      github: "https://github.com/shamrozamalik2",
    },
    {
      img: ghlActions,
      bg: "linear-gradient(135deg,#1a0a2e,#2d1b4e)",
      title: "GoHighLevel (GHL) Integrations & Apps",
      desc: "Providing custom GoHighLevel solutions including workflow automation, third-party integrations, and custom app development to streamline business processes and improve efficiency.",
      stack: ["Node.js", "APIs", "Webhooks", "GHL", "Automation"],
      github: "https://github.com/shamrozamalik2",
    },
    {
      img: automations,
      bg: "linear-gradient(135deg,#0a1a0a,#133613)",
      title: "GHL Automation Expert",
      desc: "Expert in building advanced automation workflows in GoHighLevel, including triggers, campaigns, pipelines, and CRM automation to optimize marketing and sales operations.",
      stack: ["GHL", "Automation", "CRM", "Workflows", "Zapier"],
      github: "https://github.com/shamrozamalik2",
    },
    {
      img: customwebsites,
      bg: "linear-gradient(135deg,#1a1000,#3d2800)",
      title: "Custom Website Development",
      desc: "Offering custom website solutions including business websites, e-commerce platforms, and responsive web applications tailored to client requirements and modern UI/UX standards.",
      stack: ["React", "Node.js", "MongoDB", "E-commerce", "UI/UX"],
      github: "https://github.com/shamrozamalik2",
    },
    {
      img: extension,
      bg: "linear-gradient(135deg,#1a0a00,#3d1400)",
      title: "GHL Theme Builder Expert",
      desc: "Specialized in designing and building custom GoHighLevel themes with fully responsive layouts, modern UI design, and optimized performance for high-converting funnels and websites.",
      stack: ["GHL", "Themes", "Funnels", "CSS", "UI Design"],
      github: "https://github.com/shamrozamalik2",
    },
  ];

  return (
    <section id="projects" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Projects</div>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-sub">A selection of projects showcasing my backend engineering and full-stack capabilities.</p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={p.title} className={`proj-card reveal d${(i % 3) + 1}`}>
              <div className="proj-img">
                <div className="proj-placeholder">
                  <img src={p.img} alt={p.title} className="proj-image" />
                </div>
                <div className="proj-overlay">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedImage(p.img)}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Demo
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    <i className="fa-brands fa-github"></i> Code
                  </a>
                </div>
              </div>
              <div className="proj-body">
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="stack-wrap">
                  {p.stack.map((s) => <span key={s} className="stack-tag">{s}</span>)}
                </div>
                <div className="proj-links">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedImage(p.img)}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Project Preview" />
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ----- Services ----- */
function Services() {
  const services = [
    {
      icon: "fa-solid fa-plug", color: "var(--accent-bright)", title: "API Integration",
      desc: "Seamless integration of third-party APIs into your product ecosystem.",
      items: ["Payment gateways (Stripe, PayPal)", "Social auth (Google, GitHub OAuth)", "SMS & email (Twilio, SendGrid)", "Cloud storage (AWS S3, Cloudinary)", "Maps & geolocation APIs"]
    },
    {
      icon: "fa-solid fa-server", color: "var(--accent-bright)", title: "Backend Development",
      desc: "Scalable, secure, and well-documented APIs that power any frontend.",
      items: ["RESTful & GraphQL API design", "Auth & authorization (JWT, RBAC)", "Database architecture & optimization", "Microservices & modular structure", "API docs with Swagger"]
    },
    {
      icon: "fa-brands fa-chrome", color: "#4285F4", title: "Chrome & Edge Extensions",
      desc: "Custom browser extensions to automate workflows and enhance productivity.",
      items: ["Chrome Extension Development", "Microsoft Edge Add-ons", "Automation Tools", "API Integration in Extensions", "Browser UI Customization"]
    },
    {
      icon: "fa-brands fa-react", color: "#61dafb", title: "Full-Stack Development",
      desc: "Complete web apps from database to UI, built for performance.",
      items: ["MERN stack applications", "Responsive UI with React", "State management (Redux, Zustand)", "Progressive Web Apps (PWA)", "Deployment & CI/CD setup"]
    },
    {
      icon: "fa-solid fa-gear", color: "#22c55e", title: "GoHighLevel (GHL) Expert",
      desc: "Helping businesses automate and scale using GoHighLevel CRM solutions.",
      items: ["GHL Funnel Setup", "Automation Workflows", "CRM Customization", "Lead Management", "Marketing Integrations"]
    },

    // ✅ REPLACED (Consulting → Custom Widgets)
    {
      icon: "fa-solid fa-puzzle-piece", color: "#f59e0b", title: "Custom Widgets & APIs",
      desc: "Building reusable widgets and robust APIs tailored to your business needs.",
      items: ["Reusable UI Widgets", "REST API Development", "Third-party Integrations", "Performance Optimization", "Custom Dashboards"]
    },
  ];

  return (
    <section id="services" className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Services</div>
          <h2 className="section-title">What I Offer</h2>
          <p className="section-sub">End-to-end backend solutions that help startups and businesses move faster and scale smarter.</p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={s.title} className={`svc-card reveal d${(i % 3) + 1}`}>
              <div className="svc-icon">
                <i className={s.icon} style={{ color: s.color }}></i>
              </div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <ul className="svc-list">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Contact ----- */
function Contact() {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const socials = [
    {
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/shamroza-malik-9781a8283/"
    },
    {
      icon: "fa-brands fa-github",
      label: "GitHub",
      link: "https://github.com/shamrozamalik2"
    },
    // {
    //   icon: "fa-brands fa-x-twitter",
    //   label: "Twitter",
    //   link: "#"
    // },
    // {
    //   icon: "fa-brands fa-discord",
    //   label: "Discord",
    //   link: "#" // or invite link
    // }
  ];

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setDone(true);
      else alert(data.error);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="contact" className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-sub">Have a project in mind or want to chat? I'd love to hear from you.</p>
        </div>

        <div className="contact-grid">

          {/* Left */}
          <div className="reveal-left">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>I'm open to freelance projects, collaborations, and internship opportunities.
                Drop me a message and I'll get back within 24 hours.</p>
            </div>

            {[
              { icon: "fa-solid fa-envelope", label: "Email", val: "malikshamroza2@email.com", href: "mailto:malikshamroza2@email.com" },
              { icon: "fa-solid fa-location-dot", label: "Location", val: "Pakistan 🇵🇰 · Available Remotely" },
              { icon: "fa-solid fa-clock", label: "Response Time", val: "Usually within 24 hours" },
            ].map((it) => (
              <div key={it.label} className="c-item">
                <div className="c-icon"><i className={it.icon}></i></div>
                <div className="c-text">
                  <span>{it.label}</span>
                  {it.href ? <a href={it.href}>{it.val}</a> : <p>{it.val}</p>}
                </div>
              </div>
            ))}




            <div className="social-links">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soc-link"
                  aria-label={s.label}
                  title={s.label}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal">
            <form className="c-form" onSubmit={submit}>
              <div className="form-row2">
                <div className="form-grp">
                  <label>First Name</label>
                  <input name="fname" value={form.fname} onChange={change} placeholder="John" required />
                </div>
                <div className="form-grp">
                  <label>Last Name</label>
                  <input name="lname" value={form.lname} onChange={change} placeholder="Doe" />
                </div>
              </div>
              <div className="form-grp">
                <label>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={change}
                  placeholder="john@example.com" required />
              </div>
              <div className="form-grp">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={change}
                  placeholder="Project collaboration, freelance, etc." />
              </div>
              <div className="form-grp">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={change}
                  placeholder="Tell me about your project or idea..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={sending}>
                {sending
                  ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</>
                  : <><i className="fa-solid fa-paper-plane"></i> Send Message</>
                }
              </button>
              {done && (
                <div className="form-success show">
                  <i className="fa-solid fa-circle-check"></i>&nbsp; Message sent! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Footer ----- */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-inner">
          <span className="foot-logo">Shamroza's Code</span>
          <p className="foot-copy">© {new Date().getFullYear()} Shamroza Falak · MERN Stack Developer</p>
          <div className="foot-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----- Scroll to top ----- */
function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button id="scroll-top" className={visible ? "visible" : ""}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top">
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}

/* ============================================================
   ROOT APP
============================================================ */
export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Mount effects
  useReveal();
  useSkillBars();

  return (
    <>
      <GlobalStyles />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}

// Navigation.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Settings,
  Code,
  Video,
  Share2,
  Mail,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import logo from "../pages/assets/assests/cropped-WhatsApp_Image_2024-12-02_at_14.02.28_62850caf-removebg-preview.png";

/**
 * Key fixes:
 * - True 3-zone layout: Brand (left), perfectly centered links (middle), CTA (right)
 * - Even spacing & same visual weight for all links (no oversized "Home" chip)
 * - Slim active underline + soft border (subtle, premium)
 * - Services dropdown centered under its trigger; no layout shift
 * - Mobile: clean drawer, sections tidy
 */

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    {
      path: "/services",
      label: "Services",
      icon: Settings,
      dropdown: [
        { path: "/web-services", label: "Web Development", icon: Code },
        { path: "/ads-service", label: "Ads / Performance Marketing", icon: Share2 },
        { path: "/video-services", label: "Video Editing & Production", icon: Video },
        { path: "/social-services", label: "Social Media Marketing", icon: Share2 },
      ],
    },
    { path: "/about-us", label: "About Us" },
    { path: "/team", label: "Team" },
    // Contact removed from the central nav; CTA button on the right still links to /contact
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // outside click to close dropdown
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // If mobile drawer is open, ignore document-level outside clicks here
      // because mobile drawer handles its own close logic. Closing the
      // desktop dropdown on mousedown stole the click from mobile submenu
      // links (their DOM was removed before the click event), preventing
      // navigation. Skipping when mobileOpen is true preserves the click.
      if (mobileOpen) return;
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen]);

  // lock body scroll for mobile
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // close mobile drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (path?: string) => (path ? location.pathname === path : false);


  return (
    <nav aria-label="Primary" className={`fixed top-0 inset-x-0 z-50 flex justify-center items-start py-6 bg-transparent navigation-lift`}>
      <style>{`
        .navbar-ss {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 8px 0 rgba(44,99,255,0.07);
          border: 1.5px solid #e6e6e6;
          padding: 0.55rem 3.5rem;
          max-width: 1320px;
          margin: 0 auto;
          position: relative; /* allow absolute centering of link group */
          display: flex;
          gap: 1rem;
          align-items: center;
          width: 100%;
          min-height: 54px;
          /* Even slower transitions (smoother) for shrink/expand - adjusted per request */
          transition: padding 700ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 700ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1), max-width 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .navbar-logo-img { height: 2.1rem; width: 2.1rem; border-radius: 50%; transition: height 700ms cubic-bezier(0.2, 0.8, 0.2, 1), width 700ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1); }
          .navbar-ss.shrink { box-shadow: 0 4px 16px rgba(20,20,40,0.06); }
          @media (min-width: 768px) {
            /* Make shrink less aggressive - do not make the nav too narrow; keep it wide-ish like the reference */
            /* Shrink: subtle width reduction on scroll; keep height unchanged */
            /* When scrolled, the nav width will shrink more noticeably for a compact header. 
              Keep height & CTA unchanged; only horizontal compression and max-width alter. */
            .navbar-ss.shrink { padding: 0.55rem 1rem; max-width: 820px; border-radius: 16px; min-height: 54px; }
            .navbar-ss.shrink .navbar-logo-img { height: 1.5rem; width: 1.5rem; }
            .navbar-ss.shrink .navbar-ss-brand { font-size: 0.98rem; }
            .navbar-ss.shrink .navbar-ss-links { gap: 1.2rem; }
            /* Keep CTA shape unchanged on scroll - do not resize it */
          }
        .navbar-ss-logo {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 1.08rem;
          letter-spacing: -0.01em;
          user-select: none;
        }
        .navbar-ss-brand {
          margin-left: 0.5rem;
          font-weight: 600;
          font-size: 1.08rem;
          color: #181C32;
        }
        .navbar-ss-links {
          display: flex;
          align-items: center;
          gap: 2.1rem;
          margin: 0 1rem 0 1rem;
          font-size: 1.01rem;
          font-weight: 400;
        }
        @media (min-width: 768px) {
          .navbar-ss { display: grid; grid-template-columns: auto 1fr auto; }
          /* Force the links group to be centered in the navbar independently of brand/CTA sizes */
          .navbar-ss-links { justify-self: center; position: static; transform: none; pointer-events: auto; z-index: 20; }
        }
        .navbar-ss-link {
          color: #181C32;
          text-decoration: none;
          font-weight: 400;
          letter-spacing: 0.01em;
          transition: color 0.18s, font-weight 0.18s, transform 280ms cubic-bezier(0.2,0.8,0.2,1), opacity 220ms;
          padding: 2px 0;
          position: relative;
          will-change: transform, opacity;
        }
        .navbar-ss-link:hover { transform: translateY(-3px); opacity: 0.98; }
        .navbar-ss-link.active {
          color: #1A4DB3;
          font-weight: 600;
        }
        .navbar-ss-link.active::after {
          content: '';
          display: block;
          margin: 0 auto;
          margin-top: 2px;
          width: 50%;
          height: 2px;
          border-radius: 1.5px;
          background: #1A4DB3;
        }
        .navbar-ss-contact {
          background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%);
          color: #fff;
          border-radius: 16px;
          padding: 0.5rem 2.1rem;
          font-weight: 500;
          font-size: 1.01rem;
          border: 1.5px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 2px 8px 0 rgba(168, 85, 247, 0.25), 0 0 20px rgba(168, 85, 247, 0.15);
          transition: all 0.3s ease;
          outline: none;
          cursor: pointer;
          position: relative;
        }
        .navbar-ss-contact:hover {
          background: linear-gradient(135deg, #c026d3 0%, #a855f7 50%, #8b5cf6 100%);
          border-color: rgba(192, 38, 211, 0.5);
          box-shadow: 0 4px 16px 0 rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.25);
          transform: translateY(-1px) scale(1.02);
        }
          /* Small, responsive lift for the nav so it sits slightly higher than the top edge
            without breaking safe-area on mobile or overlapping UI. Adjusts across breakpoints.
            Using a CSS variable makes quick tuning easier. */
          :root { --nav-lift-mobile: -10px; --nav-lift-desktop: -18px; }
          .navigation-lift { transform: translateY(var(--nav-lift-mobile)); transition: transform 280ms cubic-bezier(0.2,0.8,0.2,1); }
          @media (min-width: 768px) { .navigation-lift { transform: translateY(var(--nav-lift-desktop)); } }
        @media (prefers-reduced-motion: reduce) { .navigation-lift { transform: none !important; } }
        /* Dropdown entrance animation */
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-8px) scale(0.992); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dropdown-panel { animation: dropdownFade 260ms cubic-bezier(0.2,0.8,0.2,1) both; transform-origin: top center; }
        @media (prefers-reduced-motion: reduce) { .dropdown-panel { animation: none; } }
      `}</style>
      <div className={`navbar-ss ${scrolled ? 'shrink' : ''}`} style={{width:'100%'}}> 
        <div style={{display:'flex',alignItems:'center',minWidth:'0'}}>
          <Link to="/" className="navbar-ss-logo" style={{marginRight:'2.2rem'}}>
            <img src={logo} alt="Logo" className="navbar-logo-img" />
            <span className="navbar-ss-brand">Metabull Universe</span>
          </Link>
        </div>
        <div className="navbar-ss-links" style={{justifyContent:'center',display:'flex',alignItems:'center',minWidth:'0',position:'relative'}}>
          <Link to="/" className={`navbar-ss-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
          <div style={{position:'relative',display:'flex',alignItems:'center'}} onMouseEnter={()=>setOpenDropdown('services')} onMouseLeave={()=>setOpenDropdown(null)}>
            <button type="button" className={`navbar-ss-link${location.pathname.startsWith('/services') ? ' active' : ''}`} style={{display:'flex',alignItems:'center',gap:'0.3rem',background:'none',border:'none',cursor:'pointer',padding:0}} onFocus={()=>setOpenDropdown('services')} aria-haspopup="menu" aria-expanded={openDropdown==='services'}>
              Services
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{marginLeft:'2px'}} xmlns="http://www.w3.org/2000/svg"><path d="M5 8L10 13L15 8" stroke="#1A4DB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {openDropdown==='services' && (
              <div className="dropdown-panel" style={{
                position:'absolute',
                top:'calc(100% + 2px)',
                left:'50%',
                transform:'translateX(-50%)',
                background:'#fff',
                border:'1.5px solid #e6e6e6',
                borderRadius:'18px',
                boxShadow:'0 8px 32px 0 rgba(20,20,40,0.13)',
                padding:'0.7rem 0.5rem 0.5rem 0.5rem',
                zIndex:100,
                minWidth:'295px',
                color:'#181C32',
                fontFamily:'inherit',
                overflow:'hidden'
              }} onMouseLeave={()=>setOpenDropdown(null)}>
                <div style={{padding:'0.7rem 1.1rem 0.4rem 1.1rem',fontSize:'0.93rem',fontWeight:600,letterSpacing:'0.04em',color:'#6b7280',textTransform:'uppercase',opacity:0.92}}>Our Services</div>
                <Link to="/web-services" style={{display:'flex',alignItems:'center',gap:'0.9rem',padding:'0.7rem 1.1rem',borderRadius:'10px',color:'#181C32',fontWeight:600,fontSize:'1.05rem',textDecoration:'none',transition:'background 0.18s'}} onMouseEnter={e=>e.currentTarget.style.background='#f3f4f6'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:'8px',padding:'0.38rem'}}>
                    <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 18v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="4"/></svg>
                  </span>
                  Web Development
                </Link>
                <Link to="/ads-service" style={{display:'flex',alignItems:'center',gap:'0.9rem',padding:'0.7rem 1.1rem',borderRadius:'10px',color:'#181C32',fontWeight:600,fontSize:'1.05rem',textDecoration:'none',transition:'background 0.18s'}} onMouseEnter={e=>e.currentTarget.style.background='#f3f4f6'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:'8px',padding:'0.38rem'}}>
                    <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.5"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M16 19h2"/></svg>
                  </span>
                  Ads / Performance Marketing
                </Link>
                <Link to="/video-services" style={{display:'flex',alignItems:'center',gap:'0.9rem',padding:'0.7rem 1.1rem',borderRadius:'10px',color:'#181C32',fontWeight:600,fontSize:'1.05rem',textDecoration:'none',transition:'background 0.18s'}} onMouseEnter={e=>e.currentTarget.style.background='#f3f4f6'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:'8px',padding:'0.38rem'}}>
                    <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="m15 11-1 1-2-2-3 3"/></svg>
                  </span>
                  Video Editing & Production
                </Link>
                <Link to="/social-services" style={{display:'flex',alignItems:'center',gap:'0.9rem',padding:'0.7rem 1.1rem',borderRadius:'10px',color:'#181C32',fontWeight:600,fontSize:'1.05rem',textDecoration:'none',transition:'background 0.18s'}} onMouseEnter={e=>e.currentTarget.style.background='#f3f4f6'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:'8px',padding:'0.38rem'}}>
                    <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.14.24.22.51.22.8 0 .29-.08.56-.22.8z"/></svg>
                  </span>
                  Social Media Marketing
                </Link>
              </div>
            )}
          </div>
          <Link to="/about-us" className={`navbar-ss-link${location.pathname === '/about-us' ? ' active' : ''}`}>About us</Link>
          <Link to="/team" className={`navbar-ss-link${location.pathname === '/team' ? ' active' : ''}`}>Team</Link>
          {/* Contact link removed as requested. CTA on the right (Get Started) still links to /contact */}
        </div>
        <div style={{display:'flex',alignItems:'center',minWidth:'0'}}>
          <Link to="/contact" className="navbar-ss-contact">Get Started</Link>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-500 transform ${
          mobileOpen ? "max-h-[85vh] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="mt-2 border-t border-white/10 bg-gray-950/80 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              if ((link as any).dropdown) {
                return (
                  <div key={link.label} className="rounded-xl bg-white/5">
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-200"
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      aria-expanded={openDropdown === link.label}
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        {link.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="px-2 pb-2 space-y-1">
                        {(link as any).dropdown.map(
                          (
                            item: {
                              path: string;
                              label: string;
                              icon?: React.ComponentType<any>;
                            },
                            idx: number
                          ) => {
                            const ItemIcon = item.icon;
                            const active = isActive(item.path);
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                                  active
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                                style={{ transitionDelay: `${idx * 30}ms` }}
                              >
                                {ItemIcon && (
                                  <ItemIcon className="h-4 w-4 text-purple-400" />
                                )}
                                {item.label}
                              </Link>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              const Icon = (link as any).icon as React.ComponentType<any> | undefined;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path!}
                  onClick={() => setMobileOpen(false)}
                  className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-white/10"
                      : "text-gray-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              );
            })}

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_8px_30px_rgba(88,28,135,0.35)]"
            >
              <Sparkles className="h-4 w-4" />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
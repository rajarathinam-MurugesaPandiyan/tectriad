import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CHANNEL_URL } from "../data/videosData";
import { TectriadLogo, SunIcon, MoonIcon, YouTubeIcon } from "./Icons";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const { pathname } = useLocation();
  const isTutorialsPage = pathname === "/tutorials";
  const isDiscussPage = pathname === "/discuss";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync mobile drawer state with CSS breakpoint (max-width: 900px)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 901px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileMenuOpen(false);
      }
    };
    mql.addEventListener("change", handleMediaChange);
    return () => mql.removeEventListener("change", handleMediaChange);
  }, []);

  // Dismiss mobile drawer on Escape or outside pointer click
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}
    >
      <div className="nav-container">
        <Link
          to="/"
          className="brand-logo"
          aria-label="Tectriad — Rajarathinam M, Gowtham M & Gary A"
        >
          <div className="logo-badge">
            <TectriadLogo size={32} />
          </div>
          <div className="brand-names">
            <div className="brand-title-row">
              <span className="brand-title">Tectriad</span>
            </div>
          </div>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          <Link to="/#hero" className="nav-link">
            Overview
          </Link>
          <Link to="/#products" className="nav-link">
            Products
          </Link>
          <Link
            to="/tutorials"
            className={`nav-link ${isTutorialsPage ? "active" : ""}`}
            aria-current={isTutorialsPage ? "page" : undefined}
          >
            Tutorials
          </Link>
          <Link to="/#mission" className="nav-link">
            The Triad
          </Link>
          <Link
            to="/discuss"
            className={`nav-link ${isDiscussPage ? "active" : ""}`}
            aria-current={isDiscussPage ? "page" : undefined}
          >
            Let&apos;s Discuss
          </Link>
          <a href="#community" className="nav-link">
            Community
          </a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <a
            href={`${CHANNEL_URL}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-youtube btn-sm nav-subscribe-btn"
          >
            <YouTubeIcon size={16} />
            <span>Subscribe</span>
          </a>

          <button
            ref={toggleBtnRef}
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span
              className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}
            />
            <span
              className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}
            />
            <span
              className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}
            />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          className="mobile-drawer"
          aria-label="Mobile"
        >
          <div className="mobile-drawer-links">
            <Link
              to="/#hero"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              <span>Tectriad Overview</span>
              <span className="badge badge-primary">Org</span>
            </Link>
            <Link
              to="/#products"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              <span>Products &amp; Services</span>
              <span className="badge badge-emerald">3 Offerings</span>
            </Link>
            <Link
              to="/tutorials"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
              aria-current={isTutorialsPage ? "page" : undefined}
            >
              <span>Ethics Of Coding Tutorials</span>
              <span className="badge badge-yt">16+ Videos</span>
            </Link>
            <Link
              to="/#mission"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              <span>The Triad (Founders)</span>
            </Link>
            <Link
              to="/discuss"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
              aria-current={isDiscussPage ? "page" : undefined}
            >
              <span>Have an Idea? Let&apos;s Discuss</span>
              <span className="badge badge-primary">Connect</span>
            </Link>
            <a
              href="#community"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              <span>Community</span>
            </a>
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-theme-row">
              <span>Appearance</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onToggleTheme}
              >
                {theme === "dark" ? (
                  <>
                    <SunIcon size={15} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <MoonIcon size={15} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            <a
              href={`${CHANNEL_URL}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-youtube mobile-drawer-cta"
              onClick={closeMobileMenu}
            >
              <YouTubeIcon size={17} />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

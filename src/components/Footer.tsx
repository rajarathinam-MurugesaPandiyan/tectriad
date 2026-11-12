import React from 'react';
import { Link } from 'react-router-dom';
import { CHANNEL_URL, CHANNEL_HANDLE } from '../data/videosData';
import {
  TectriadLogo,
  YouTubeIcon,
  ArrowUpIcon,
  ExternalLinkIcon,
} from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="footer-wrapper" id="community">
      <div className="container footer-content-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="logo-badge">
              <TectriadLogo size={32} />
            </div>
            <div className="footer-brand-stack">
              <span className="footer-brand-name">Tectriad</span>
              <span className="footer-brand-sub">
                Rajarathinam M • Gowtham M • Gary A
              </span>
            </div>
          </div>

          <p className="footer-about-text">
            A software and developer education organization founded by
            Rajarathinam M, Gowtham M, and Gary A—building Ethics Of Coding,
            xpense-cloud, and Streako.
          </p>

          <div className="footer-channel-link-box">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-channel-badge"
            >
              <YouTubeIcon size={19} className="footer-yt-icon" />
              <span>{CHANNEL_HANDLE} on YouTube</span>
            </a>
          </div>
        </div>

        {/* Products & Services Column */}
        <div className="footer-links-col">
          <h2 className="footer-col-title">Products &amp; Services</h2>
          <ul className="footer-links-list">
            <li>
              <Link to="/tutorials">Ethics Of Coding (Service)</Link>
            </li>
            <li>
              <a
                href="https://xpense-cloud.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                xpense-cloud.in (Product) <ExternalLinkIcon size={12} />
              </a>
            </li>
            <li>
              <a
                href="http://streako.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                streako.in (Product) <ExternalLinkIcon size={12} />
              </a>
            </li>
            <li>
              <Link to="/#products">All Products &amp; Services</Link>
            </li>
            <li>
              <Link to="/#mission">Meet the Triad</Link>
            </li>
          </ul>
        </div>

        {/* Masterclasses Column */}
        <div className="footer-links-col">
          <h2 className="footer-col-title">Popular Masterclasses</h2>
          <ul className="footer-links-list">
            <li>
              <Link to="/tutorials">Flutter Complete Tutorial Season 1</Link>
            </li>
            <li>
              <Link to="/tutorials">Flutter Complete Tutorial Season 2</Link>
            </li>
            <li>
              <Link to="/tutorials">Flutter BLoC Pattern Masterclass</Link>
            </li>
            <li>
              <Link to="/tutorials">Web Dev Course (HTML, CSS, JS)</Link>
            </li>
            <li>
              <Link to="/#product-xpense-cloud">xpense-cloud Case Study</Link>
            </li>
          </ul>
        </div>

        {/* Community Column */}
        <div className="footer-links-col">
          <h2 className="footer-col-title">Join the Community</h2>
          <p className="footer-community-desc">
            Subscribe and join our engineering community—learn clean architecture,
            track your habits with Streako, and manage expenses in xpense-cloud.
          </p>
          <div className="footer-social-buttons">
            <a
              href={`${CHANNEL_URL}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-youtube btn-sm footer-sub-btn"
            >
              <YouTubeIcon size={16} />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <div className="bottom-copy">
          © {new Date().getFullYear()} Tectriad • Founded by Rajarathinam M,
          Gowtham M &amp; Gary A.
        </div>
        <div className="bottom-center">
          Ethics Of Coding • xpense-cloud • Streako
        </div>
        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          <span>Top</span>
          <ArrowUpIcon size={14} />
        </button>
      </div>
    </footer>
  );
};

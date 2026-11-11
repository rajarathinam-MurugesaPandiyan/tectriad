import React from 'react';
import { CHANNEL_URL, CHANNEL_HANDLE } from '../data/videosData';
import {
  TechTriadLogo,
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
              <TechTriadLogo size={24} />
            </div>
            <div className="footer-brand-stack">
              <span className="footer-brand-name">Tech Triad</span>
              <span className="footer-brand-sub">
                Rajarathinam • Gowtham • Gary
              </span>
            </div>
          </div>

          <p className="footer-about-text">
            A software and developer education organization founded by
            Rajarathinam, Gowtham, and Gary—building Ethics Of Coding,
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
              <a href="#videos">Ethics Of Coding (Service)</a>
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
              <a href="#products">All Products &amp; Services</a>
            </li>
            <li>
              <a href="#mission">Meet the Triad</a>
            </li>
          </ul>
        </div>

        {/* Masterclasses Column */}
        <div className="footer-links-col">
          <h2 className="footer-col-title">Popular Masterclasses</h2>
          <ul className="footer-links-list">
            <li>
              <a href="#videos">Flutter Complete Tutorial Season 1</a>
            </li>
            <li>
              <a href="#videos">Flutter Complete Tutorial Season 2</a>
            </li>
            <li>
              <a href="#videos">Flutter BLoC Pattern Masterclass</a>
            </li>
            <li>
              <a href="#videos">Web Dev Course (HTML, CSS, JS)</a>
            </li>
            <li>
              <a href="#product-xpense-cloud">xpense-cloud Case Study</a>
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
          © {new Date().getFullYear()} Tech Triad • Founded by Rajarathinam,
          Gowtham &amp; Gary.
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

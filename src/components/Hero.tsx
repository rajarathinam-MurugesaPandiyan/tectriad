import React from 'react';
import {
  TECH_TRIAD_ORG,
  TECH_TRIAD_MEMBERS,
  TECH_TRIAD_OFFERINGS,
} from '../data/triadData';
import {
  TechTriadLogo,
  OfferingBrandIcon,
  PlayIcon,
  ExternalLinkIcon,
} from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-content-grid">
        <div className="hero-text-block">
          <div className="badge badge-primary hero-badge">
            <span className="pulsing-dot" aria-hidden="true" />
            <span>{TECH_TRIAD_ORG.eyebrow}</span>
          </div>

          <h1 className="hero-title">
            {TECH_TRIAD_ORG.headlinePrefix}{' '}
            <span className="gradient-text">{TECH_TRIAD_ORG.headlineAccent}</span>
          </h1>

          <p className="hero-description">{TECH_TRIAD_ORG.description}</p>

          <div className="hero-actions">
            <a href="#products" className="btn btn-primary">
              <span>Explore Products &amp; Services</span>
            </a>
            <a href="#videos" className="btn btn-secondary">
              <PlayIcon size={16} />
              <span>Watch Coding Masterclasses</span>
            </a>
          </div>
        </div>

        {/* Visual Tech Triad Organizational Hierarchy Pattern */}
        <div
          className="triad-architecture"
          aria-label="Tech Triad founding team and products & services structure"
        >
          {/* Top Node: The Founding Triad (Rajarathinam, Gowtham & Gary) */}
          <div className="triad-parent-node glass-card">
            <div className="triad-parent-head">
              <div className="triad-parent-emblem">
                <TechTriadLogo size={26} />
              </div>
              <div className="triad-parent-copy">
                <span className="triad-parent-kicker">The Founding Triad</span>
                <span className="triad-parent-name">{TECH_TRIAD_ORG.name}</span>
              </div>
            </div>

            <span className="triad-parent-divider" aria-hidden="true" />

            <ul className="triad-founders-pills" aria-label="Triad co-founders">
              {TECH_TRIAD_MEMBERS.map((member) => (
                <li
                  key={member.id}
                  className={`triad-founder-pill brand-theme-${member.accentId}`}
                >
                  <span
                    className={`triad-founder-avatar brand-icon-${member.accentId}`}
                    aria-hidden="true"
                  >
                    {member.initial}
                  </span>
                  <span className="triad-founder-name">{member.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architectural Connector Lines branching into Products & Services */}
          <div className="triad-connectors" aria-hidden="true">
            <svg
              viewBox="0 0 900 48"
              preserveAspectRatio="none"
              className="triad-connector-svg"
            >
              <line
                x1="450"
                y1="0"
                x2="450"
                y2="24"
                vectorEffect="non-scaling-stroke"
                className="triad-line-stem"
              />
              <line
                x1="145"
                y1="24"
                x2="755"
                y2="24"
                vectorEffect="non-scaling-stroke"
                className="triad-line-rail"
              />
              <line
                x1="145"
                y1="24"
                x2="145"
                y2="48"
                vectorEffect="non-scaling-stroke"
                className="triad-line-drop triad-drop-ethics"
              />
              <line
                x1="450"
                y1="24"
                x2="450"
                y2="48"
                vectorEffect="non-scaling-stroke"
                className="triad-line-drop triad-drop-xpense"
              />
              <line
                x1="755"
                y1="24"
                x2="755"
                y2="48"
                vectorEffect="non-scaling-stroke"
                className="triad-line-drop triad-drop-streako"
              />
            </svg>
            <span className="triad-connector-label">
              {TECH_TRIAD_ORG.offeringsLabel}
            </span>
          </div>

          {/* Products & Services Built Underneath Tech Triad */}
          <ul className="triad-branches-grid">
            {TECH_TRIAD_OFFERINGS.map((offering) => (
              <li
                key={offering.id}
                className={`triad-branch-card glass-card brand-theme-${offering.id}`}
              >
                <div className="triad-branch-top">
                  <div className={`triad-branch-icon brand-icon-${offering.id}`}>
                    <OfferingBrandIcon brandId={offering.id} size={20} />
                  </div>
                  <span className={`triad-kind-badge brand-chip-${offering.id}`}>
                    {offering.kind}
                  </span>
                </div>

                <div className="triad-branch-body">
                  <span className="triad-branch-role">{offering.roleLabel}</span>
                  <h2 className="triad-branch-name">{offering.name}</h2>
                  <p className="triad-branch-summary">{offering.summary}</p>
                </div>

                <div className="triad-branch-footer">
                  <span className={`triad-status-chip brand-chip-${offering.id}`}>
                    {offering.statusLabel}
                  </span>
                  <div className="triad-branch-links">
                    <a
                      href={offering.targetSection}
                      className="triad-branch-anchor"
                    >
                      Details
                    </a>
                    {offering.externalUrl && (
                      <a
                        href={offering.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="triad-branch-ext"
                        aria-label={`Open ${offering.name} (${offering.domainLabel}) in new tab`}
                      >
                        <span>{offering.domainLabel}</span>
                        <ExternalLinkIcon size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

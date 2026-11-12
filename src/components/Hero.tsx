import React from "react";
import {
  TECTRIAD_ORG,
  TECTRIAD_OFFERINGS,
} from "../data/triadData";
import {
  TectriadLogo,
  OfferingBrandIcon,
  PlayIcon,
  ExternalLinkIcon,
} from "./Icons";

export const Hero: React.FC = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-content-grid">
        <div className="hero-text-block">
          <div className="badge badge-primary hero-badge">
            <span className="pulsing-dot" aria-hidden="true" />
            <span>{TECTRIAD_ORG.eyebrow}</span>
          </div>

          <h1 className="hero-title">
            {TECTRIAD_ORG.headlinePrefix}{" "}
            <span className="gradient-text">{TECTRIAD_ORG.headlineAccent}</span>
          </h1>

          <p className="hero-description">{TECTRIAD_ORG.description}</p>

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

        {/* Visual Tectriad Organizational Hierarchy Pattern */}
        <div
          className="triad-architecture"
          aria-label="Tectriad founding team and products & services structure"
        >
          {/* Top Node: The Founding Triad (Rajarathinam M, Gowtham M & Gary A) */}
          <div className="triad-parent-node glass-card">
            <div className="triad-parent-head">
              <div className="triad-parent-emblem">
                <TectriadLogo size={30} />
              </div>
              <div className="triad-parent-copy">
                <span className="triad-parent-name">{TECTRIAD_ORG.name}</span>
              </div>
            </div>
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
              {TECTRIAD_ORG.offeringsLabel}
            </span>
          </div>

          {/* Products & Services Built Underneath Tectriad */}
          <ul className="triad-branches-grid">
            {TECTRIAD_OFFERINGS.map((offering) => (
              <li
                key={offering.id}
                className={`triad-branch-card glass-card brand-theme-${offering.id}`}
              >
                <div className="triad-branch-top">
                  <div
                    className={`triad-branch-icon brand-icon-${offering.id}`}
                  >
                    <OfferingBrandIcon brandId={offering.id} size={20} />
                  </div>
                  <span
                    className={`triad-kind-badge brand-chip-${offering.id}`}
                  >
                    {offering.kind}
                  </span>
                </div>

                <div className="triad-branch-body">
                  <span className="triad-branch-role">
                    {offering.roleLabel}
                  </span>
                  <h2 className="triad-branch-name">{offering.name}</h2>
                  <p className="triad-branch-summary">{offering.summary}</p>
                </div>

                <div className="triad-branch-footer">
                  <span
                    className={`triad-status-chip brand-chip-${offering.id}`}
                  >
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

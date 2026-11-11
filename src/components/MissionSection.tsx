import React from 'react';
import { TECH_TRIAD_MEMBERS } from '../data/triadData';

export const MissionSection: React.FC = () => {
  return (
    <section className="section-wrapper mission-section" id="mission">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="badge badge-accent">
              The Triad • People Behind Tech Triad
            </span>
          </div>
          <h2>
            Meet the Triad:{' '}
            <span className="gradient-text">Rajarathinam, Gowtham &amp; Gary</span>
          </h2>
          <p>
            We are the three co-founders behind Tech Triad—uniting to deliver
            accessible developer education via Ethics Of Coding alongside our
            consumer software products xpense-cloud and Streako.
          </p>
        </div>

        {/* Founding Triad Cards */}
        <ul className="pillars-grid" aria-label="Tech Triad founding members">
          {TECH_TRIAD_MEMBERS.map((member, index) => (
            <li
              key={member.id}
              className={`glass-card pillar-card brand-theme-${member.accentId}`}
            >
              <div className="founder-card-top">
                <div
                  className={`pillar-icon-bubble founder-monogram brand-icon-${member.accentId}`}
                  aria-hidden="true"
                >
                  <span>{member.initial}</span>
                </div>
                <span className="triad-branch-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <div className="pillar-header-group">
                <span className={`pillar-subtitle brand-text-${member.accentId}`}>
                  {member.role}
                </span>
                <h3 className="pillar-title">{member.name}</h3>
              </div>
              <p className="pillar-desc">
                One third of the Tech Triad collective—collaborating to build, ship,
                and support Ethics Of Coding, xpense-cloud, and Streako.
              </p>
            </li>
          ))}
        </ul>

        <div className="glass-card mission-quote-card">
          <div className="quote-mark" aria-hidden="true">
            &ldquo;
          </div>
          <blockquote className="mission-quote-text">
            The Great Learning Platform In Tamil, With Lots of Learning With No
            Cost — Because We Value Education.
          </blockquote>
          <div className="quote-attribution">
            <span className="quote-author">Ethics Of Coding • A Tech Triad Service</span>
            <span className="quote-role">
              Founded by Rajarathinam, Gowtham &amp; Gary
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

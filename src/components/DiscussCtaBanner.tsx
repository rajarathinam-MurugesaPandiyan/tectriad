import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SendIcon } from './Icons';

export const DiscussCtaBanner: React.FC = () => {
  return (
    <section
      className="section-wrapper discuss-cta-section"
      aria-labelledby="discuss-cta-heading"
    >
      <div className="container">
        <div className="glass-card discuss-cta-card">
          <div className="discuss-cta-copy">
            <div className="discuss-cta-eyebrow">
              <span className="badge badge-primary">Collaborate With Us</span>
            </div>
            <h2 id="discuss-cta-heading">
              Have Any Idea in Mind? <span className="gradient-text">Let&apos;s Discuss</span>
            </h2>
            <p>
              Whether you want to build a product, share feedback on xpense-cloud or Streako, or
              suggest an Ethics Of Coding tutorial, reach out directly.
            </p>
          </div>
          <div className="discuss-cta-action">
            <Link to="/discuss" className="btn btn-primary">
              <SendIcon size={16} />
              Start a Discussion
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


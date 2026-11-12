import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/productsData';
import type { ProductFeature } from '../types';
import {
  OfferingBrandIcon,
  GlobeIcon,
  GooglePlayIcon,
  AppleIcon,
  YouTubeIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
} from './Icons';

function renderFeatureIcon(icon: ProductFeature['icon']) {
  const shared = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (icon) {
    case 'lightning':
      return (
        <svg {...shared}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...shared}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...shared}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...shared}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...shared}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...shared}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...shared}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'award':
      return (
        <svg {...shared}>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...shared}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    default:
      return (
        <svg {...shared}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

export const ProductsSection: React.FC = () => {
  return (
    <section className="section-wrapper projects-section" id="products">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="badge badge-primary">Products &amp; Services</span>
          </div>
          <h2>
            Our Products &amp; Services Under{' '}
            <span className="gradient-text">Tectriad</span>
          </h2>
          <p>
            Built and operated by Rajarathinam M, Gowtham M, and Gary A—combining free
            developer education services with live finance and daily habit products.
          </p>
        </div>

        <div className="ecosystem-grid">
          {PRODUCTS_DATA.map((product) => (
            <article
              key={product.id}
              id={`product-${product.brandId}`}
              className={`ecosystem-card glass-card brand-theme-${product.brandId}`}
            >
              {/* Row 1: Card Identity Header */}
              <div className="ecosystem-card-header">
                <div className="ecosystem-brand-row">
                  <div className={`project-icon-box brand-icon-${product.brandId}`}>
                    <OfferingBrandIcon brandId={product.brandId} size={24} />
                  </div>
                  <div className="project-title-group">
                    <div className="project-badge-row">
                      <span className={`badge badge-brand-${product.brandId}`}>
                        {product.kind} • {product.status}
                      </span>
                      <span className="badge-platform-tag">{product.platforms}</span>
                    </div>
                    <h3 className="project-name">{product.name}</h3>
                  </div>
                </div>
                <p className={`project-tagline-text brand-text-${product.brandId}`}>
                  {product.tagline}
                </p>
              </div>

              {/* Row 2: Description & Highlights */}
              <div className="ecosystem-card-body">
                <p className="project-description-text">{product.description}</p>

                <ul className="ecosystem-feature-list">
                  {product.features.map((feat) => (
                    <li key={feat.title} className="ecosystem-feature-item">
                      <span className={`ecosystem-feat-icon brand-text-${product.brandId}`}>
                        {renderFeatureIcon(feat.icon)}
                      </span>
                      <div className="ecosystem-feat-copy">
                        <strong className="ecosystem-feat-title">{feat.title}</strong>
                        <span className="ecosystem-feat-desc">{feat.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 3: Quick Stats + Pills */}
              <div className="ecosystem-card-meta">
                <div className="ecosystem-stats-pair">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="ecosystem-stat-box">
                      <span className="ecosystem-stat-label">{stat.label}</span>
                      <strong className="ecosystem-stat-value">{stat.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="project-pills-row">
                  {product.highlights.map((item) => (
                    <span key={item} className="project-pill">
                      <span className={`project-pill-icon brand-text-${product.brandId}`}>
                        <CheckCircleIcon size={12} />
                      </span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 4: Action Footer */}
              <div className="project-actions-container">
                {product.websiteUrl && (
                  <a
                    href={product.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-brand-${product.brandId} project-primary-btn`}
                  >
                    <GlobeIcon size={16} />
                    <span>{product.websiteLabel || `Open ${product.name}`}</span>
                    <ExternalLinkIcon size={14} />
                  </a>
                )}

                {product.internalHref &&
                  (product.internalHref.startsWith('/') ? (
                    <Link
                      to={product.internalHref}
                      className={`btn btn-brand-${product.brandId} project-primary-btn`}
                    >
                      <span>{product.internalLabel}</span>
                    </Link>
                  ) : (
                    <a
                      href={product.internalHref}
                      className={`btn btn-brand-${product.brandId} project-primary-btn`}
                    >
                      <span>{product.internalLabel}</span>
                    </a>
                  ))}

                {(product.playStoreUrl || product.appStoreUrl || product.externalActionUrl) && (
                  <div className="project-secondary-actions">
                    {product.playStoreUrl && (
                      <a
                        href={product.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm store-btn"
                      >
                        <GooglePlayIcon size={15} />
                        <span>Google Play</span>
                      </a>
                    )}
                    {product.appStoreUrl && (
                      <a
                        href={product.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm store-btn"
                      >
                        <AppleIcon size={15} />
                        <span>App Store</span>
                      </a>
                    )}
                    {product.externalActionUrl && (
                      <a
                        href={product.externalActionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm store-btn"
                      >
                        <YouTubeIcon size={15} />
                        <span>{product.externalActionLabel}</span>
                        <ExternalLinkIcon size={13} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

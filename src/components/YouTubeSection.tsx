import React, { useState, useMemo, useId } from 'react';
import { Link } from 'react-router-dom';
import { VIDEOS_DATA, CHANNEL_URL, CHANNEL_HANDLE } from '../data/videosData';
import type { CategoryType, VideoItem } from '../types';
import {
  YouTubeIcon,
  SearchIcon,
  PlayIcon,
  ExternalLinkIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from './Icons';

interface YouTubeSectionProps {
  onOpenVideoModal: (videoId: string, videoTitle: string) => void;
  /** When set, shows a preview grid capped to this count with a See More route link. */
  previewLimit?: number;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({
  onOpenVideoModal,
  previewLimit,
}) => {
  const isPreview = typeof previewLimit === 'number' && previewLimit > 0;
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputId = useId();

  const categories: { key: CategoryType; label: string; count: number }[] = [
    { key: 'all', label: 'All Videos', count: VIDEOS_DATA.length },
    {
      key: 'flutter',
      label: 'Flutter & Dart',
      count: VIDEOS_DATA.filter((v) => v.category === 'flutter').length,
    },
    {
      key: 'web',
      label: 'Web Dev',
      count: VIDEOS_DATA.filter((v) => v.category === 'web').length,
    },
    {
      key: 'career',
      label: 'Career & Tips',
      count: VIDEOS_DATA.filter((v) => v.category === 'career').length,
    },
    {
      key: 'products',
      label: 'Product Demos',
      count: VIDEOS_DATA.filter((v) => v.category === 'products').length,
    },
  ];

  const filteredVideos = useMemo(() => {
    if (isPreview) {
      return VIDEOS_DATA.slice(0, previewLimit);
    }

    const q = searchQuery.toLowerCase().trim();
    return VIDEOS_DATA.filter((video) => {
      const matchesCategory =
        selectedCategory === 'all' || video.category === selectedCategory;
      const matchesSearch =
        !q ||
        video.title.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [isPreview, previewLimit, selectedCategory, searchQuery]);

  const remainingCount = Math.max(0, VIDEOS_DATA.length - filteredVideos.length);

  return (
    <section
      className={`section-wrapper youtube-section ${isPreview ? '' : 'tutorials-page-section'}`}
      id="videos"
    >
      <div className="container">
        {!isPreview && (
          <div className="tutorials-back-bar">
            <Link to="/" className="btn btn-secondary btn-sm tutorials-back-btn">
              <ArrowLeftIcon size={15} />
              <span>Back to Home</span>
            </Link>
          </div>
        )}

        <div className="section-header">
          <div className="section-eyebrow">
            <span className="badge badge-yt">
              Ethics Of Coding Academy • {CHANNEL_HANDLE}
            </span>
          </div>

          {isPreview ? (
            <h2>
              Coding Tutorials &amp; Masterclasses in{' '}
              <span className="gradient-text">Tamil</span>
            </h2>
          ) : (
            <h1 className="tutorials-page-title">
              All Coding Tutorials &amp; Masterclasses in{' '}
              <span className="gradient-text">Tamil</span>
            </h1>
          )}

          <p>
            Tectriad&apos;s developer education service—teaching Flutter mobile
            engineering, BLoC state management, modern frontend craft, and real-world
            product architecture step by step.
          </p>

          <div className="header-channel-bar">
            <div className="channel-info-pill">
              <span className="yt-dot" aria-hidden="true" />
              <span>
                Free Education • {VIDEOS_DATA.length} Tutorials Available
              </span>
            </div>
            <a
              href={`${CHANNEL_URL}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-youtube btn-sm"
            >
              <YouTubeIcon size={17} />
              <span>Subscribe to Channel</span>
            </a>
          </div>
        </div>

        {/* Full Filter & Search Toolbar on the dedicated Tutorials page */}
        {!isPreview && (
          <>
            <div className="video-filter-bar glass-card">
              <div
                className="category-pills-row"
                role="group"
                aria-label="Filter tutorials by category"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    aria-pressed={selectedCategory === cat.key}
                    className={`category-pill-btn ${
                      selectedCategory === cat.key ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat.key)}
                  >
                    <span>{cat.label}</span>
                    <span className="pill-count">{cat.count}</span>
                  </button>
                ))}
              </div>

              <div className="search-input-wrapper">
                <label htmlFor={searchInputId} className="visually-hidden">
                  Search tutorials
                </label>
                <SearchIcon size={17} className="search-icon" />
                <input
                  id={searchInputId}
                  type="search"
                  className="search-input"
                  placeholder="Search tutorials (Flutter, BLoC, Web, Xpense)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                  >
                    <CloseIcon size={15} />
                  </button>
                )}
              </div>
            </div>

            <p className="results-status" aria-live="polite">
              Showing {filteredVideos.length} of {VIDEOS_DATA.length} tutorials
              {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
              {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}.
            </p>
          </>
        )}

        {filteredVideos.length > 0 ? (
          <div className="videos-grid">
            {filteredVideos.map((video: VideoItem) => (
              <article key={video.id} className="video-card glass-card">
                <button
                  type="button"
                  className="video-thumb-container"
                  onClick={() => onOpenVideoModal(video.id, video.title)}
                  aria-label={`Play preview: ${video.title}`}
                >
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="video-thumbnail"
                    loading="lazy"
                    width={480}
                    height={360}
                  />
                  <span className="video-thumb-overlay" aria-hidden="true">
                    <span className="play-button-circle">
                      <PlayIcon size={20} />
                    </span>
                  </span>
                  {video.duration && (
                    <span className="video-duration-badge">{video.duration}</span>
                  )}
                  {video.featured && (
                    <span className="video-featured-badge">Featured</span>
                  )}
                </button>

                <div className="video-info-content">
                  <div className="video-meta-row">
                    <span className="badge badge-accent badge-mini">
                      {video.categoryLabel}
                    </span>
                    <span className="video-author">Ethics Of Coding</span>
                  </div>

                  <h3 className="video-title" title={video.title}>
                    {video.title}
                  </h3>

                  <p className="video-desc">{video.description}</p>

                  <div className="video-tags-row">
                    {video.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="video-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="video-actions-row">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm watch-preview-btn"
                      onClick={() => onOpenVideoModal(video.id, video.title)}
                    >
                      <PlayIcon size={14} />
                      <span>Watch Preview</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm watch-yt-link"
                      aria-label={`Open ${video.title} on YouTube in new tab`}
                    >
                      <span>YouTube</span>
                      <ExternalLinkIcon size={13} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-videos-box glass-card">
            <div className="no-videos-icon" aria-hidden="true">
              <SearchIcon size={32} />
            </div>
            <h3>No Tutorials Found</h3>
            <p>
              We couldn&apos;t find any videos matching &ldquo;{searchQuery}&rdquo;.
              Try a different keyword or reset the category filters.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {isPreview && remainingCount > 0 && (
          <div className="videos-see-more-row">
            <Link to="/tutorials" className="btn btn-primary videos-see-more-btn">
              <span>See More Tutorials ({VIDEOS_DATA.length} Total)</span>
              <ArrowRightIcon size={16} />
            </Link>
            <p className="videos-see-more-caption">
              Showing {filteredVideos.length} of {VIDEOS_DATA.length} tutorials — filter by
              category &amp; search all masterclasses.
            </p>
          </div>
        )}

        <div className="glass-card channel-cta-banner">
          <div className="channel-cta-left">
            <h3>Want more tutorials and live architecture sessions?</h3>
            <p>
              Subscribe to <strong>Ethics Of Coding</strong> on YouTube to get
              notified whenever new Flutter masterclasses, web engineering
              guides, and Tectriad product breakdowns go live.
            </p>
          </div>
          <div className="channel-cta-right">
            <a
              href={`${CHANNEL_URL}/videos`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span>View Full Channel Feed</span>
              <ExternalLinkIcon size={15} />
            </a>
            <a
              href={`${CHANNEL_URL}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-youtube"
            >
              <YouTubeIcon size={17} />
              <span>Subscribe ({CHANNEL_HANDLE})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

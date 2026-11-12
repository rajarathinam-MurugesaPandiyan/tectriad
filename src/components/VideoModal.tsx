import React, { useEffect, useRef } from 'react';
import { CloseIcon, ExternalLinkIcon } from './Icons';

interface VideoModalProps {
  videoId: string | null;
  videoTitle: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videoId,
  videoTitle,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Sync native top-layer <dialog> modal open/close state with React prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (videoId) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [videoId]);

  // Progressive fallback for browsers without native closedby="any" support (e.g., Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    let pressedOutside = false;
    const handlePointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e) && dialog.open) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleRequestClose = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    } else {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="video-dialog"
      aria-labelledby="video-modal-title"
      onClose={onClose}
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      {videoId && (
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title-box">
              <span className="badge badge-yt">Now Playing</span>
              <h2 id="video-modal-title" className="modal-title">
                {videoTitle}
              </h2>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleRequestClose}
              aria-label="Close video player"
              autoFocus
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="modal-player-container">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="modal-iframe"
            />
          </div>

          <div className="modal-footer">
            <span className="modal-note">
              Ethics Of Coding Academy • Tectriad
            </span>
            <div className="modal-footer-actions">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>Watch on YouTube</span>
                <ExternalLinkIcon size={14} />
              </a>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleRequestClose}
              >
                Done Watching
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

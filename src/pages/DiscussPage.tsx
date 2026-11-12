import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  SendIcon,
  YouTubeIcon,
} from '../components/Icons';
import { TECTRIAD_MEMBERS, TECTRIAD_ORG } from '../data/triadData';
import { CHANNEL_HANDLE, CHANNEL_URL } from '../data/videosData';

const DISCUSS_API_URL = 'https://dev.xpense-cloud.in/api/v1/post';

interface DiscussFormValues {
  author_name: string;
  email: string;
  name: string;
  other_name: string;
  description: string;
}

type FieldKey = keyof DiscussFormValues;

interface DiscussPostPayload {
  author_name: string;
  description: string;
  email: string;
  email_id: string;
  name: string;
  other_name: string;
}

const INITIAL_VALUES: DiscussFormValues = {
  author_name: '',
  email: '',
  name: '',
  other_name: '',
  description: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUPPORTS_CSS_HAS =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
    ? CSS.supports('selector(:has(a))')
    : true;

function validateFieldValue(field: FieldKey, rawValue: string): string {
  const value = rawValue.trim();

  switch (field) {
    case 'author_name':
      if (!value) {
        return 'Enter your full name so we know who to address.';
      }
      if (value.length < 2) {
        return 'Enter at least 2 characters for your name.';
      }
      return '';
    case 'email':
      if (!value) {
        return 'Enter an email address in the format you@example.com.';
      }
      if (!EMAIL_PATTERN.test(value)) {
        return 'Enter a valid email address in the format you@example.com.';
      }
      return '';
    case 'name':
      if (!value) {
        return 'Enter a short title for your idea or project.';
      }
      if (value.length < 3) {
        return 'Enter at least 3 characters for your idea title.';
      }
      return '';
    case 'other_name':
      return '';
    case 'description':
      if (!value) {
        return 'Describe your idea, goals, or questions in at least 10 characters.';
      }
      if (value.length < 10) {
        return 'Add a few more details so we can understand your idea (at least 10 characters).';
      }
      return '';
  }
}

const DISCUSSION_TOPICS = [
  'Mobile & web product builds (Flutter, React, TypeScript)',
  'Full-stack architecture & scalable backend APIs',
  'App feedback, feature ideas, or collaborations on xpense-cloud & Streako',
  'Developer tutorials or deep-dive topic requests for Ethics Of Coding',
];

export const DiscussPage: React.FC = () => {
  const formId = useId();
  const [values, setValues] = useState<DiscussFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedPayload, setSubmittedPayload] = useState<DiscussPostPayload | null>(null);

  const announceTimerRef = useRef<number | null>(null);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLInputElement | HTMLTextAreaElement | null>>>(
    {}
  );

  useEffect(() => {
    return () => {
      if (announceTimerRef.current !== null) {
        window.clearTimeout(announceTimerRef.current);
      }
    };
  }, []);

  const schedulePoliteAnnouncement = (message: string) => {
    if (announceTimerRef.current !== null) {
      window.clearTimeout(announceTimerRef.current);
    }
    if (!message) {
      setLiveAnnouncement('');
      return;
    }
    announceTimerRef.current = window.setTimeout(() => {
      setLiveAnnouncement(message);
    }, 500);
  };

  const syncControlCustomValidity = (
    element: HTMLInputElement | HTMLTextAreaElement | null,
    errorMessage: string
  ) => {
    if (element) {
      element.setCustomValidity(errorMessage);
    }
  };

  const handleFieldChange = (field: FieldKey, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (submitError) {
      setSubmitError('');
    }

    const nextError = validateFieldValue(field, nextValue);
    syncControlCustomValidity(fieldRefs.current[field] ?? null, nextError);

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: nextError }));
      if (!nextError) {
        schedulePoliteAnnouncement('');
      }
    }
  };

  const handleFieldBlur = (field: FieldKey) => {
    const nextError = validateFieldValue(field, values[field]);
    syncControlCustomValidity(fieldRefs.current[field] ?? null, nextError);
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: nextError }));
    if (nextError) {
      schedulePoliteAnnouncement(nextError);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const orderedFields: FieldKey[] = [
      'author_name',
      'email',
      'name',
      'other_name',
      'description',
    ];
    const nextTouched: Partial<Record<FieldKey, boolean>> = {};
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    let firstInvalidField: FieldKey | null = null;

    for (const field of orderedFields) {
      nextTouched[field] = true;
      const err = validateFieldValue(field, values[field]);
      syncControlCustomValidity(fieldRefs.current[field] ?? null, err);
      if (err) {
        nextErrors[field] = err;
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    }

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (firstInvalidField) {
      const targetEl = fieldRefs.current[firstInvalidField];
      targetEl?.focus();
      const firstErr = nextErrors[firstInvalidField] ?? 'Please review the highlighted fields.';
      setLiveAnnouncement(firstErr);
      return;
    }

    const trimmedEmail = values.email.trim();
    const payload: DiscussPostPayload = {
      author_name: values.author_name.trim(),
      description: values.description.trim(),
      email: trimmedEmail,
      email_id: trimmedEmail,
      name: values.name.trim(),
      other_name: values.other_name.trim(),
    };

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(DISCUSS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let serverMessage = `Request failed with status ${response.status}.`;
        try {
          const text = await response.text();
          if (text) {
            const parsed = JSON.parse(text) as { message?: string; error?: string };
            serverMessage = parsed.message || parsed.error || serverMessage;
          }
        } catch {
          // Keep default status error message if response body is not JSON.
        }
        throw new Error(serverMessage);
      }

      setSubmittedPayload(payload);
      setValues(INITIAL_VALUES);
      setTouched({});
      setErrors({});
      setLiveAnnouncement('Your idea has been sent to Tectriad.');
    } catch (err) {
      const fallbackMessage =
        err instanceof Error && err.message
          ? `Could not send your message: ${err.message}`
          : 'We could not reach the server right now. Please check your connection and try again.';
      setSubmitError(fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setSubmittedPayload(null);
    setSubmitError('');
    setLiveAnnouncement('');
  };

  const authorError = errors.author_name ?? '';
  const emailError = errors.email ?? '';
  const nameError = errors.name ?? '';
  const descriptionError = errors.description ?? '';

  return (
    <section
      className="section-wrapper discuss-page-section"
      aria-labelledby="discuss-page-heading"
    >
      <div className="container">
        <div className="tutorials-back-bar">
          <Link to="/" className="btn btn-secondary btn-sm">
            <ArrowLeftIcon size={15} /> Back to Home
          </Link>
        </div>

        <header className="section-header">
          <div className="section-eyebrow">
            <span className="badge badge-primary">Let&apos;s Connect</span>
          </div>
          <h1 id="discuss-page-heading" className="tutorials-page-title">
            Have Any Idea in Mind? <span className="gradient-text">Let&apos;s Discuss</span>
          </h1>
          <p>
            Share a product idea, engineering challenge, app feedback, or collaboration proposal.
            Send us the details below and the {TECTRIAD_ORG.name} team will get back to you.
          </p>
        </header>

        <div className="discuss-layout">
          <div className="glass-card discuss-form-card">
            <div aria-live="polite" aria-atomic="true" className="visually-hidden">
              {liveAnnouncement}
            </div>

            {submittedPayload ? (
              <div className="discuss-success-state" role="status">
                <div className="discuss-success-icon" aria-hidden="true">
                  <CheckCircleIcon size={24} />
                </div>
                <h2>Message Sent Successfully</h2>
                <p>
                  Thanks, <strong>{submittedPayload.author_name}</strong>. We received{' '}
                  <strong>{submittedPayload.name}</strong> and will reply to{' '}
                  <strong>{submittedPayload.email}</strong>.
                </p>
                <div className="discuss-success-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetSuccess}
                  >
                    Send Another Idea
                  </button>
                  <Link to="/" className="btn btn-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="discuss-form"
                aria-busy={isSubmitting}
              >
                <div className="discuss-form-header">
                  <h2>Start a Conversation</h2>
                  <p>
                    Fields marked with <span aria-hidden="true">*</span>
                    <span className="visually-hidden">an asterisk</span> are required.
                  </p>
                </div>

                {submitError && (
                  <div className="discuss-status-banner is-error" role="alert">
                    <AlertCircleIcon size={18} />
                    <div>
                      <strong>Submission failed.</strong> {submitError}
                    </div>
                  </div>
                )}

                <div
                  className={`form-field ${
                    !SUPPORTS_CSS_HAS && authorError ? 'has-error-fallback' : ''
                  }`}
                >
                  <label htmlFor={`${formId}-author_name`} className="form-label">
                    Your Name <span aria-hidden="true">*</span>
                  </label>
                  <p id={`${formId}-author_name-hint`} className="form-hint">
                    Who should we address in our reply?
                  </p>
                  <input
                    ref={(el) => {
                      fieldRefs.current.author_name = el;
                    }}
                    id={`${formId}-author_name`}
                    name="author_name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    enterKeyHint="next"
                    value={values.author_name}
                    onChange={(e) => handleFieldChange('author_name', e.target.value)}
                    onBlur={() => handleFieldBlur('author_name')}
                    aria-invalid={authorError ? 'true' : 'false'}
                    aria-describedby={
                      authorError
                        ? `${formId}-author_name-hint ${formId}-author_name-error`
                        : `${formId}-author_name-hint`
                    }
                    className={`form-input ${
                      touched.author_name && authorError ? 'user-invalid-fallback' : ''
                    }`}
                    placeholder="e.g. Karthik Sundaram"
                  />
                  <p
                    id={`${formId}-author_name-error`}
                    className={`field-error-msg ${authorError ? 'is-visible' : ''}`}
                    hidden={!authorError}
                  >
                    {authorError}
                  </p>
                </div>

                <div
                  className={`form-field ${
                    !SUPPORTS_CSS_HAS && emailError ? 'has-error-fallback' : ''
                  }`}
                >
                  <label htmlFor={`${formId}-email`} className="form-label">
                    Email Address <span aria-hidden="true">*</span>
                  </label>
                  <p id={`${formId}-email-hint`} className="form-hint">
                    Format: you@example.com
                  </p>
                  <input
                    ref={(el) => {
                      fieldRefs.current.email = el;
                    }}
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    inputMode="email"
                    required
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    enterKeyHint="next"
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleFieldBlur('email')}
                    aria-invalid={emailError ? 'true' : 'false'}
                    aria-describedby={
                      emailError
                        ? `${formId}-email-hint ${formId}-email-error`
                        : `${formId}-email-hint`
                    }
                    className={`form-input ${
                      touched.email && emailError ? 'user-invalid-fallback' : ''
                    }`}
                    placeholder="you@example.com"
                  />
                  <p
                    id={`${formId}-email-error`}
                    className={`field-error-msg ${emailError ? 'is-visible' : ''}`}
                    hidden={!emailError}
                  >
                    {emailError}
                  </p>
                </div>

                <div
                  className={`form-field ${
                    !SUPPORTS_CSS_HAS && nameError ? 'has-error-fallback' : ''
                  }`}
                >
                  <label htmlFor={`${formId}-name`} className="form-label">
                    Idea or Project Title <span aria-hidden="true">*</span>
                  </label>
                  <p id={`${formId}-name-hint`} className="form-hint">
                    A concise title for your product idea, topic, or collaboration request.
                  </p>
                  <input
                    ref={(el) => {
                      fieldRefs.current.name = el;
                    }}
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    required
                    minLength={3}
                    enterKeyHint="next"
                    value={values.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={() => handleFieldBlur('name')}
                    aria-invalid={nameError ? 'true' : 'false'}
                    aria-describedby={
                      nameError
                        ? `${formId}-name-hint ${formId}-name-error`
                        : `${formId}-name-hint`
                    }
                    className={`form-input ${
                      touched.name && nameError ? 'user-invalid-fallback' : ''
                    }`}
                    placeholder="e.g. Offline sync concept for expense tracking"
                  />
                  <p
                    id={`${formId}-name-error`}
                    className={`field-error-msg ${nameError ? 'is-visible' : ''}`}
                    hidden={!nameError}
                  >
                    {nameError}
                  </p>
                </div>

                <div className="form-field">
                  <label htmlFor={`${formId}-other_name`} className="form-label">
                    Organization, Role, or Handle (Optional)
                  </label>
                  <p id={`${formId}-other_name-hint`} className="form-hint">
                    Optional — company name, project link, or social handle.
                  </p>
                  <input
                    ref={(el) => {
                      fieldRefs.current.other_name = el;
                    }}
                    id={`${formId}-other_name`}
                    name="other_name"
                    type="text"
                    autoComplete="organization"
                    enterKeyHint="next"
                    value={values.other_name}
                    onChange={(e) => handleFieldChange('other_name', e.target.value)}
                    aria-invalid="false"
                    aria-describedby={`${formId}-other_name-hint`}
                    className="form-input"
                    placeholder="e.g. Acme Labs / @karthik"
                  />
                </div>

                <div
                  className={`form-field ${
                    !SUPPORTS_CSS_HAS && descriptionError ? 'has-error-fallback' : ''
                  }`}
                >
                  <label htmlFor={`${formId}-description`} className="form-label">
                    Tell Us About Your Idea <span aria-hidden="true">*</span>
                  </label>
                  <p id={`${formId}-description-hint`} className="form-hint">
                    Share what you are building, your goals, timeline, or questions (at least 10
                    characters).
                  </p>
                  <textarea
                    ref={(el) => {
                      fieldRefs.current.description = el;
                    }}
                    id={`${formId}-description`}
                    name="description"
                    rows={5}
                    required
                    minLength={10}
                    value={values.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    onBlur={() => handleFieldBlur('description')}
                    aria-invalid={descriptionError ? 'true' : 'false'}
                    aria-describedby={
                      descriptionError
                        ? `${formId}-description-hint ${formId}-description-error`
                        : `${formId}-description-hint`
                    }
                    className={`form-textarea ${
                      touched.description && descriptionError ? 'user-invalid-fallback' : ''
                    }`}
                    placeholder="Outline the problem, target users, or how you'd like to collaborate..."
                  />
                  <p
                    id={`${formId}-description-error`}
                    className={`field-error-msg ${descriptionError ? 'is-visible' : ''}`}
                    hidden={!descriptionError}
                  >
                    {descriptionError}
                  </p>
                </div>

                <div className="discuss-form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary discuss-submit-btn"
                    disabled={isSubmitting}
                  >
                    <SendIcon size={17} />
                    {isSubmitting ? 'Sending Idea...' : 'Send Idea'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="discuss-sidebar" aria-label="Connect with Tectriad">
            <div className="glass-card discuss-sidebar-card">
              <h3>What We Can Discuss</h3>
              <ul className="discuss-topic-list">
                {DISCUSSION_TOPICS.map((topic) => (
                  <li key={topic}>
                    <span className="discuss-topic-icon" aria-hidden="true">
                      <CheckCircleIcon size={13} />
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card discuss-sidebar-card">
              <h3>The Founders Behind {TECTRIAD_ORG.name}</h3>
              <ul className="discuss-founders-list">
                {TECTRIAD_MEMBERS.map((member) => (
                  <li key={member.id} className="discuss-founder-row">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="discuss-founder-avatar"
                      style={{ objectPosition: member.avatarPosition ?? 'center 25%' }}
                    />
                    <div className="discuss-founder-meta">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="discuss-channel-row">
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm discuss-channel-btn"
                >
                  <YouTubeIcon size={16} />
                  {CHANNEL_HANDLE}
                  <ExternalLinkIcon size={13} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

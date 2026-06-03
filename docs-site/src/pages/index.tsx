import type {ReactNode, CSSProperties} from 'react';
import {useState, useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const DEVICE_TRANSITION_MS = 450;
const PHONE_FRAME_W = 428;
const PHONE_FRAME_H = 868;

function getDemoUrl(): string {
  if (typeof window === 'undefined') {
    return '/demo';
  }
  const {hostname} = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3002';
  }
  return '/demo';
}

type DemoViewMode = 'desktop' | 'mobile';

function DesktopIcon() {
  return (
    <svg
      className={styles.viewSwitcherIcon}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M9 20h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg
      className={styles.viewSwitcherIcon}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <rect
        x="7"
        y="3"
        width="10"
        height="18"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="17.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function DemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [viewMode, setViewMode] = useState<DemoViewMode>('desktop');
  const [phoneScale, setPhoneScale] = useState(0.88);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mobileHostRef = useRef<HTMLDivElement>(null);
  const skipResizeOnOpenRef = useRef(true);

  const updatePhoneScale = useCallback(() => {
    const host = mobileHostRef.current;
    if (!host) return;
    const {clientWidth: w, clientHeight: h} = host;
    if (w <= 0 || h <= 0) return;
    setPhoneScale(Math.min(w / PHONE_FRAME_W, h / PHONE_FRAME_H, 1));
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || viewMode !== 'mobile') return;
    updatePhoneScale();
    const host = mobileHostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(updatePhoneScale);
    observer.observe(host);
    return () => observer.disconnect();
  }, [isOpen, viewMode, updatePhoneScale]);

  const notifyDemoResize = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {type: 'seatmap-demo-resize'},
      '*',
    );
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) {
      setViewMode('desktop');
      skipResizeOnOpenRef.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (skipResizeOnOpenRef.current) {
      skipResizeOnOpenRef.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      if (viewMode === 'mobile') {
        updatePhoneScale();
      }
      notifyDemoResize();
    }, DEVICE_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [viewMode, isOpen, notifyDemoResize, updatePhoneScale]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Live Demo">
      <div
        className={clsx(
          styles.modalContent,
          viewMode === 'mobile' && styles.modalContentMobile,
        )}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Live Demo</span>
          <div
            className={styles.viewSwitcher}
            role="group"
            aria-label="Preview mode">
            <button
              type="button"
              className={clsx(
                styles.viewSwitcherBtn,
                viewMode === 'desktop' && styles.viewSwitcherBtnActive,
              )}
              aria-pressed={viewMode === 'desktop'}
              aria-label="Desktop preview"
              title="Desktop"
              onClick={() => setViewMode('desktop')}>
              <DesktopIcon />
            </button>
            <button
              type="button"
              className={clsx(
                styles.viewSwitcherBtn,
                viewMode === 'mobile' && styles.viewSwitcherBtnActive,
              )}
              aria-pressed={viewMode === 'mobile'}
              aria-label="Mobile preview"
              title="Mobile"
              onClick={() => setViewMode('mobile')}>
              <MobileIcon />
            </button>
          </div>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close demo">
            ×
          </button>
        </div>
        <div className={styles.modalFrame}>
          <div
            ref={mobileHostRef}
            className={clsx(
              viewMode === 'mobile'
                ? styles.iphoneScaler
                : styles.previewHostDesktop,
            )}
            onTransitionEnd={(event) => {
              if (
                event.propertyName === 'width' ||
                event.propertyName === 'transform'
              ) {
                notifyDemoResize();
              }
            }}>
            <div
              className={clsx(
                viewMode === 'mobile'
                  ? styles.iphoneScaleSlot
                  : styles.previewViewportDesktop,
              )}
              style={
                viewMode === 'mobile'
                  ? ({
                      width: `${PHONE_FRAME_W * phoneScale}px`,
                      height: `${PHONE_FRAME_H * phoneScale}px`,
                    } as CSSProperties)
                  : undefined
              }>
              <div
                className={clsx(
                  viewMode === 'mobile'
                    ? styles.deviceShellMobile
                    : styles.previewContent,
                )}
                style={
                  viewMode === 'mobile'
                    ? ({
                        transform: `scale(${phoneScale})`,
                        transformOrigin: 'top left',
                      } as CSSProperties)
                    : undefined
                }>
                {viewMode === 'mobile' && (
                  <>
                    <div className={styles.iphoneStripe} aria-hidden="true" />
                    <div className={styles.iphoneNotch} aria-hidden="true" />
                    <div className={styles.iphoneSensors} aria-hidden="true" />
                    <div className={styles.iphoneBtns} aria-hidden="true" />
                    <div className={styles.iphonePower} aria-hidden="true" />
                  </>
                )}
                <div
                  className={clsx(
                    viewMode === 'mobile'
                      ? styles.iphoneFrame
                      : styles.demoIframeHost,
                  )}>
                  <iframe
                    ref={iframeRef}
                    className={clsx(
                      styles.demoIframe,
                      viewMode === 'mobile' && styles.demoIframeMobile,
                    )}
                    src={getDemoUrl()}
                    title="Seatmap Live Demo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.heroVideo}
      >
        <source src="https://videos.pexels.com/video-files/7989640/7989640-uhd_2732_1440_25fps.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className={styles.heroLogo}>
          <Link to="/" className={styles.logoLink} aria-label="Go to homepage">
            <img
              src="/img/seatmap-logo-small.png"
              alt="Seatmap Logo"
              className={styles.logoImage}
            />
          </Link>
        </div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/getting-started/installation">
            Get Started 🚀
          </Link>
          <button
            type="button"
            className="button button--outline button--lg margin-left--md"
            onClick={() => setDemoModalOpen(true)}>
            Try Live Demo
          </button>
        </div>
        <p className={styles.heroFeatures}>
          <span className={styles.featureBadge}><span>⚡</span> Lightning Fast</span>
          <span className={styles.heroFeatureSep}>·</span>
          <span className={styles.featureBadge}><span>🎨</span> Fully Customizable</span>
          <span className={styles.heroFeatureSep}>·</span>
          <span className={styles.featureBadge}><span>📱</span> Framework Agnostic</span>
        </p>
        <div className={styles.heroAnnouncement}>
          <span className={styles.heroAnnouncementLabel}>Seatmap editor is coming</span>
          <span className={styles.heroAnnouncementProduct}>Seatmap Studio</span>
          <span className={styles.heroAnnouncementText}>
            Soon you’ll design seat layouts, buses, planes, and event spaces using ready-made templates — no code required.
          </span>
          <img
            src="/img/editor-ss.png"
            alt="Seatmap Studio — seat selection editor preview"
            className={styles.heroAnnouncementImage}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Interactive Seat Selection Library`}
      description="Advanced, open-source library for interactive seat selection in stadiums, theaters, and event spaces. Built with D3.js and TypeScript.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

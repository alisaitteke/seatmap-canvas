import type {ReactNode} from 'react';
import {useState, useCallback, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const DEMO_URL = 'https://seatmap.io/demo';

function DemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

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
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close demo">
          ×
        </button>
        <iframe
          className={styles.modalIframe}
          src={DEMO_URL}
          title="Seatmap Canvas Live Demo"
        />
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
          <img
            src="/img/seatmap-logo-small.png"
            alt="Seatmap Canvas Logo"
            className={styles.logoImage}
          />
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
            Try Live Demo ✨
          </button>
        </div>
        <p className={styles.heroFeatures}>
          <span className={styles.featureBadge}><span>⚡</span> Lightning Fast</span>
          <span className={styles.heroFeatureSep}>·</span>
          <span className={styles.featureBadge}><span>🎨</span> Fully Customizable</span>
          <span className={styles.heroFeatureSep}>·</span>
          <span className={styles.featureBadge}><span>📱</span> Framework Agnostic</span>
        </p>
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

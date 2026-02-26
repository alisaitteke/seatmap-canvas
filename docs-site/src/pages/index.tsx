import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
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
          <Link
            className="button button--outline button--lg margin-left--md"
            to="https://seatmap.io/demo">
            Try Live Demo ✨
          </Link>
        </div>
        <div className={styles.heroFeatures}>
          <div className={styles.featureBadge}>
            <span>⚡</span> Lightning Fast
          </div>
          <div className={styles.featureBadge}>
            <span>🎨</span> Fully Customizable
          </div>
          <div className={styles.featureBadge}>
            <span>📱</span> Framework Agnostic
          </div>
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

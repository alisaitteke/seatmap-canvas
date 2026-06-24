import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Framework Agnostic',
    icon: '⚙️',
    description: (
      <>
        Works with vanilla JavaScript, React, and Vue 3. Official wrappers included 
        for seamless integration with your favorite framework.
      </>
    ),
  },
  {
    title: 'Highly Customizable',
    icon: '🎨',
    description: (
      <>
        Extensive styling options for seats, blocks, and labels. Support for custom 
        shapes, background images, and complete control over appearance.
      </>
    ),
  },
  {
    title: 'Built with D3.js',
    icon: '⚡',
    description: (
      <>
        Powered by D3.js for smooth rendering and interactions. Built-in zoom and pan 
        with three levels: venue, block, and seat views.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className={styles.learnMore}>
          <span>Learn more: </span>
          <Link to="/seo/use-cases/stadium-seating">Stadium seating</Link>
          <span> · </span>
          <Link to="/seo/alternatives/seats-io-alternative">seats.io alternative</Link>
          <span> · </span>
          <Link to="/seo/faq">FAQ</Link>
        </div>
      </div>
    </section>
  );
}

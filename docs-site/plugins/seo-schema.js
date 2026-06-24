const path = require('path');
const fs = require('fs');

const PACKAGE_JSON = path.resolve(__dirname, '../../package.json');

function readPackageVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    return pkg.version || '3.0.0';
  } catch {
    return '3.0.0';
  }
}

function jsonLdScript(data) {
  return {
    tagName: 'script',
    attributes: {type: 'application/ld+json'},
    innerHTML: JSON.stringify(data),
  };
}

module.exports = function () {
  const softwareVersion = readPackageVersion();

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Seatmap Canvas',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareVersion,
    downloadUrl: 'https://www.npmjs.com/package/@alisaitteke/seatmap-canvas',
    license: 'https://opensource.org/licenses/MIT',
    description:
      'Open-source interactive seat map library for stadiums, theaters, and event spaces. Built with D3.js and TypeScript.',
    url: 'https://seatmap.io',
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Seatmap',
    url: 'https://seatmap.io',
    sameAs: [
      'https://github.com/alisaitteke/seatmap-canvas',
      'https://www.npmjs.com/package/@alisaitteke/seatmap-canvas',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Seatmap Canvas Documentation',
    url: 'https://seatmap.io',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://seatmap.io/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    name: 'seo-schema',
    injectHtmlTags() {
      return {
        headTags: [
          jsonLdScript(softwareApplication),
          jsonLdScript(organization),
          jsonLdScript(website),
        ],
      };
    },
  };
};

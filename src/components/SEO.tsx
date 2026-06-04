import { Helmet } from 'react-helmet-async';
import { profile } from '../data/profile';
import { links } from '../data/links';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}

export default function SEO({
  title,
  description,
  canonical = 'https://tejpratap.com/',
  ogImage = 'https://tejpratap.com/profile.jpg',
  ogType = 'website',
  twitterHandle = '@_tejpratap',
}: SEOProps) {
  const siteTitle = title ? `${title} | ${profile.name}` : `${profile.name} - ${profile.tagline}`;
  const siteDescription = description || `${profile.role}. ${profile.mission.subtitle}`;

  const githubLink = links.find(l => l.label.toLowerCase() === 'github')?.href;
  const linkedinLink = links.find(l => l.label.toLowerCase() === 'linkedin')?.href;
  const twitterLink = links.find(l => l.label.toLowerCase() === 'twitter')?.href;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: 'https://tejpratap.com',
    sameAs: [githubLink, linkedinLink, twitterLink].filter(Boolean),
    description: siteDescription,
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
}

import { Helmet } from 'react-helmet-async';
import { profile } from '../data/profile';
import { links } from '../data/links';
import { experiences } from '../data/experience';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'profile' | 'article';
  twitterHandle?: string;
  keywords?: string[];
  noindex?: boolean;
}

const DEFAULT_KEYWORDS = [
  "Tej Pratap Singh",
  "Tej Pratap",
  "Systems Engineer",
  "Product Engineer",
  "Deputy Manager Renault",
  "Android Automotive",
  "AOSP",
  "Automotive Infotainment",
  "Medical EMR",
  "Offline First",
  "Software Engineer Portfolio",
  "Mobile App Development",
  "Kotlin Multiplatform",
  "React",
  "TypeScript",
  "Renault Nissan",
  "Tata Elxsi",
  "Catalyze Systems",
];

export default function SEO({
  title,
  description,
  canonical = 'https://tejpratap.com/',
  ogImage = 'https://tejpratap.com/profile.jpg',
  ogType = 'website',
  twitterHandle = '@_tejpratap',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}: SEOProps) {
  const siteTitle = title ? `${title} | ${profile.name}` : `${profile.name} – ${profile.tagline}`;
  const siteDescription = description || `${profile.role}. ${profile.mission.subtitle} Systems and product engineer building products that turn complex engineering problems into shipped software.`;
  const domain = 'https://tejpratap.com';

  const sameAsLinks = links
    .map((l) => l.href)
    .filter((href) => href && !href.startsWith('mailto:'));

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${domain}/#person`,
        name: profile.name,
        alternateName: ['Tej Pratap', 'Tej'],
        jobTitle: profile.role,
        description: siteDescription,
        url: domain,
        image: ogImage,
        sameAs: sameAsLinks,
        worksFor: {
          '@type': 'Organization',
          name: 'Renault Nissan Technology & Business Centre India',
          url: 'https://www.renault.com',
        },
        alumniOf: experiences.map((exp) => ({
          '@type': 'Organization',
          name: exp.company,
          url: exp.link,
        })),
        knowsAbout: [
          'Android Automotive',
          'AOSP',
          'Automotive Infotainment',
          'Offline-first Architecture',
          'Mobile Application Development',
          'Systems Engineering',
          'Product Engineering',
          'Kotlin',
          'Java',
          'Swift',
          'React',
          'TypeScript',
          'Node.js',
          'Artificial Intelligence',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${domain}/#website`,
        url: domain,
        name: `${profile.name} – ${profile.tagline}`,
        description: siteDescription,
        author: {
          '@id': `${domain}/#person`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: siteTitle,
        description: siteDescription,
        isPartOf: {
          '@id': `${domain}/#website`,
        },
        mainEntity: {
          '@id': `${domain}/#person`,
        },
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={profile.name} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${profile.name} - Profile Picture`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_US" />

      {/* Profile specific Open Graph */}
      <meta property="profile:first_name" content="Tej Pratap" />
      <meta property="profile:last_name" content="Singh" />
      <meta property="profile:username" content="tejpratap46" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${profile.name} - ${profile.tagline}`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

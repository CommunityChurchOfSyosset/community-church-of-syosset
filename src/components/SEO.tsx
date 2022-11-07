import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

export interface Props {
  readonly description?: string;
  readonly lang?: string;
  readonly meta?: [];
  readonly title: string;
}

export default function SEO(props: Props) {
  const data = useStaticQuery(
    graphql`
      query SEOComponent {
        contentfulJsonObject(title: { eq: "Website Data" }) {
          json {
            siteMetadata {
              description
              title
            }
          }
        }
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  );

  const metaDescription =
    props.description ||
    data.contentfulJsonObject.json.siteMetadata.description;

  let locationHref: string | undefined;

  if (typeof window !== 'undefined') {
    locationHref = window.location.href;
  }

  return (
    <Helmet
      htmlAttributes={{ lang: props.lang || 'en' }}
      title={props.title}
      titleTemplate={`%s | ${data.contentfulJsonObject.json.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: props.title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: locationHref,
        },
        // {
        //   property: 'og:image',
        //   content: '',
        // },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: data.site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: props.title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat(props.meta ?? [])}
    />
  );
}

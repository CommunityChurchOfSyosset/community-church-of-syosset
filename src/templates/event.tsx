import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import EmbeddedGoogleMap from '../components/EmbeddedGoogleMap';
import Layout from '../components/Layout';
import PageButtons from '../components/PageButtons';
import SEO from '../components/SEO';
import ShareSection from '../components/ShareSection';
import { baseline, color } from '../style';

export const query = graphql`
  query EventTemplate($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      date
      details {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            description
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
      title
    }
  }
`;

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
};

const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
};

const StyledEmbeddedGoogleMap = styled(EmbeddedGoogleMap)`
  background-color: ${color.body};
  border-radius: ${baseline};
  margin: calc(6 * ${baseline}) 0;
`;

const StyledPageButtons = styled(PageButtons)`
  margin-bottom: calc(6 * ${baseline});
`;

export interface Props {
  readonly data: {
    readonly contentfulEvent: {
      readonly date: string;
      readonly details?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
      readonly title: string;
    };
  };
  readonly pageContext: {
    readonly address?: {
      readonly city: string;
      readonly number: string;
      readonly state: string;
      readonly street: string;
      readonly zip: string;
    };
    readonly nextSlug?: string;
    readonly placeId?: string;
    readonly prevSlug?: string;
  };
}

export default function EventTemplate(props: Props) {
  const dateObject = new Date(props.data.contentfulEvent.date);

  const dateString = dateObject.toLocaleDateString(
    undefined,
    DATE_FORMAT_OPTIONS
  );

  const timeString = dateObject.toLocaleTimeString(
    undefined,
    TIME_FORMAT_OPTIONS
  );

  return (
    <>
      <SEO title={props.data.contentfulEvent.title} />
      <Layout>
        <CenteredTextColumn>
          <h1>{props.data.contentfulEvent.title}</h1>
          <section>
            <h2>Date and time</h2>
            <p>
              <time dateTime={props.data.contentfulEvent.date}>
                {dateString} <br />
                {timeString}
              </time>
            </p>
          </section>
          {((process.env.GATSBY_GOOGLE_MAPS_EMBED_API_KEY &&
            props.pageContext.placeId) ||
            props.pageContext.address) && (
            <section>
              <h2>Location</h2>
              {process.env.GATSBY_GOOGLE_MAPS_EMBED_API_KEY &&
                props.pageContext.placeId && (
                  <StyledEmbeddedGoogleMap
                    apiKey={process.env.GATSBY_GOOGLE_MAPS_EMBED_API_KEY}
                    aspectRatio={{ x: 1, y: 1 }}
                    mode="place"
                    q={`place_id:${props.pageContext.placeId}`}
                    title="A map of the event location"
                  />
                )}
              {props.pageContext.address && (
                <p>
                  {props.pageContext.address.number}{' '}
                  {props.pageContext.address.street} <br />
                  {props.pageContext.address.city},{' '}
                  {props.pageContext.address.state}{' '}
                  {props.pageContext.address.zip}
                </p>
              )}
              <address></address>
            </section>
          )}
          {props.data.contentfulEvent.details && (
            <section>
              <h2>Details</h2>
              {renderRichText(props.data.contentfulEvent.details, {
                renderNode: {
                  'embedded-asset-block': node =>
                    node.data.target.gatsbyImageData ? (
                      <GatsbyImage
                        alt={node.data.target.description}
                        image={node.data.target.gatsbyImageData}
                      />
                    ) : null,
                },
              })}
            </section>
          )}
          <ShareSection contentType="event" />
          {(props.pageContext.nextSlug || props.pageContext.prevSlug) && (
            <StyledPageButtons
              nextSlug={props.pageContext.nextSlug}
              prevSlug={props.pageContext.prevSlug}
              rootSlug="events"
            />
          )}
        </CenteredTextColumn>
      </Layout>
    </>
  );
}

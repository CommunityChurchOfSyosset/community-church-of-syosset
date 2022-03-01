import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import EmbeddedGoogleMap from '../components/EmbeddedGoogleMap';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import LinkButton from '../components/LinkButton';
import SEO from '../components/SEO';
import { baseline } from '../style';

const StyledEmbeddedGoogleMap = styled(EmbeddedGoogleMap)`
  border-radius: ${baseline};
  margin: calc(6 * ${baseline}) 0;
  width: 100%;
`;

const StyledLinkButton = styled(LinkButton)`
  margin-bottom: calc(6 * ${baseline});
`;

type Data = {
  readonly contentfulJsonObject: {
    readonly json: {
      readonly socialMedia: {
        readonly facebook: {
          readonly slug: string;
        };
      };
    };
  };
};

const VisitPage: React.FC = () => {
  const data = useStaticQuery<Data>(graphql`
  query VisitPage {
    contentfulJsonObject(title: { eq: "Website Data" }) {
      json {
        socialMedia {
          facebook {
            slug
          }
        }
      }
    }
  }
`);

  return (
    <>
      <SEO title="Visit" />
      <Layout>
        <h1>Visit</h1>
        <CenteredTextColumn>
          <Lead>
            Our congregation is diverse, yet intimate; our service traditional,
            yet interactive.
          </Lead>
          <section>
            <h2>Worship service</h2>
            <p>
              Our <time dateTime="10:00">10:00 AM</time> Sunday worship service
              features hymnody, anthems sung by the chancel choir, scripture
              lessons, biblical preaching, and more. Prayer requests are welcomed
              from all in attendance. In our tradition, all baptized members of
              the Christian family are invited to receive communion on the first
              Sunday of each month.
            </p>
            <p>
              Worship is a time of renewal and refreshment. After the service we
              share fellowship with food and refreshment, and take an opportunity
              to build our friendships.
            </p>
            <p>If you are unable to join us in person, our services are streamed live on <ExternalLink href={`https://www.facebook.com/${data.contentfulJsonObject.json.socialMedia.facebook.slug}`}>Facebook</ExternalLink>.</p>
          </section>
          <section>
            <h2>Location</h2>
            {process.env.GATSBY_GOOGLE_MAPS_EMBED_API_KEY && (
              <StyledEmbeddedGoogleMap
                apiKey={process.env.GATSBY_GOOGLE_MAPS_EMBED_API_KEY}
                aspectRatio={{ x: 1, y: 1 }}
                mode="place"
                q={'Community Church of Syosset'}
                title="A map of the Community Church of Syosset’s location"
              />
            )}
            <address>
              <p>
                <b>Community Church of Syosset</b> <br />
                36 Church Street <br />
                Syosset, NY 11791
              </p>
            </address>
          </section>
          <section>
            <h2>Let us know you’re coming</h2>
            <p>
              We are looking forward to meeting you! Drop us a note and we will be
              eager to welcome you on your first visit.
            </p>
            <StyledLinkButton to="/contact">Contact us</StyledLinkButton>
          </section>
        </CenteredTextColumn>
      </Layout>
    </>
  );
};

export default VisitPage;

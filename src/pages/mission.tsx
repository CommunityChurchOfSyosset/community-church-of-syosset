import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import OrganizationCardList, {
  Props as OrganizationCardListProps,
} from '../components/OrganizationCardList';
import SEO from '../components/SEO';
import { baseline } from '../style';

const NoMissionsNotice = styled(Lead)`
  font-weight: bold;
  text-align: center;
`;

const StyledOrganizationCardList = styled(OrganizationCardList)`
  margin: 0 auto calc(6 * ${baseline});
`;

interface Data {
  readonly contentfulContentList: {
    readonly items: OrganizationCardListProps['organizations'];
  };
}

export default function MissionPage() {
  const data = useStaticQuery<Data>(graphql`
    query MissionPage {
      contentfulContentList(title: { eq: "Mission List" }) {
        items {
          ... on ContentfulOrganization {
            id
            image {
              description
              gatsbyImageData(
                height: 272
                layout: FIXED
                quality: 100
                width: 272
              )
            }
            name
            url
          }
        }
      }
    }
  `);

  const organizations = data.contentfulContentList.items;

  const missionContent =
    organizations.length > 0 ? (
      <StyledOrganizationCardList organizations={organizations} />
    ) : (
      <NoMissionsNotice>
        No outreaches listed… <br />
        Check back soon!
      </NoMissionsNotice>
    );

  return (
    <>
      <SEO title="Mission" />
      <Layout>
        <h1>Mission</h1>
        <CenteredTextColumn>
          <Lead>
            We are called to care for our local community and the world.
          </Lead>
          <p>
            Jesus said,{' '}
            <q cite="https://www.biblegateway.com/verse/en/Matthew%2025:40">
              …whatever you did for one of the least of these, you did for me.
            </q>{' '}
            (
            <ExternalLink href="https://www.biblegateway.com/verse/en/Matthew%2025:40">
              Matt. 25:40
            </ExternalLink>
            ) We are taught to love others as he has loved us, so our mission is
            outreach or sharing Christ’s love and making a difference in the
            world.
          </p>
          <p>
            As our Red Bucket refills each week, we share the bounty with the
            Long Island Council of Churches for distribution to food pantries
            and those in need on Long Island. Additionally, we support justice
            and peace locally and throughout the world by supporting educational
            and social programs of the United Church of Christ such as Church’s
            Wider Mission, One Great Hour of Sharing, Strengthen the Church,
            Neighbors in Need, the Christmas Fund and UCC Coalition.
          </p>
          <p>
            Our mission in 2021 supported as well the following important
            resources for our neighbors and our world to create a better future
            for all.
          </p>
        </CenteredTextColumn>
        {missionContent}
      </Layout>
    </>
  );
}

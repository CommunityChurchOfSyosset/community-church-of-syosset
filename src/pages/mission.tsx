import { graphql, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import MissionCardList from '../components/MissionCardList';
import SEO from '../components/SEO';
import { baseline } from '../style';

const NoMissionsNotice = styled(Lead)`
  font-weight: bold;
  text-align: center;
`;

const StyledMissionCardList = styled(MissionCardList)`
  margin: 0 auto calc(6 * ${baseline});
`;

type Data = {
  allContentfulMission: {
    edges: {
      node: {
        id: string;
        image?: {
          description?: string;
          fixed: FixedObject;
        };
        name: string;
        url: string;
      };
    }[];
  };
};

const MissionPage: React.FC = () => {
  const data = useStaticQuery<Data>(graphql`
    query MissionPage {
      allContentfulMission {
        edges {
          node {
            id
            image {
              description
              fixed(height: 272, width: 272) {
                ...GatsbyContentfulFixed
              }
            }
            name
            url
          }
        }
      }
    }
  `);

  const missions = data.allContentfulMission.edges.map(({ node }) => node);

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
        {missions.length > 0 ? (
          <StyledMissionCardList missions={missions} />
        ) : (
          <NoMissionsNotice>
            No missions listed… <br />
            Check back soon!
          </NoMissionsNotice>
        )}
      </Layout>
    </>
  );
};

export default MissionPage;

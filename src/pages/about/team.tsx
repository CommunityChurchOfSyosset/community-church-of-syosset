import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../../components/CenteredTextColumn';
import Layout from '../../components/Layout';
import Lead from '../../components/Lead';
import SEO from '../../components/SEO';
import TeamMemberCardList, {
  Props as TeamMemberCardListProps,
} from '../../components/TeamMemberCardList';
import { baseline } from '../../style';

const StyledTeamMemberCardList = styled(TeamMemberCardList)`
  margin: 0 auto calc(6 * ${baseline});
`;

interface Data {
  readonly contentfulContentList: {
    readonly items: TeamMemberCardListProps['teamMembers'];
  };
}

export default function TeamPage() {
  const data = useStaticQuery<Data>(graphql`
    query TeamPage {
      contentfulContentList(title: { eq: "Staff List" }) {
        items {
          ... on ContentfulPerson {
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
            role
            slug
          }
        }
      }
    }
  `);

  const teamMembers = data.contentfulContentList.items.map(item => item);

  return (
    <>
      <SEO title="Team" />
      <Layout>
        <h1>Our team</h1>
        <CenteredTextColumn>
          <Lead>
            Meet the members of our congregation that keep the church on the
            move.
          </Lead>
          <p>Click on a member of our team to learn about them.</p>
        </CenteredTextColumn>
        <StyledTeamMemberCardList teamMembers={teamMembers} />
      </Layout>
    </>
  );
}

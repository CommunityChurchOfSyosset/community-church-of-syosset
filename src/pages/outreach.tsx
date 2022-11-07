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

const NoOutreachesNotice = styled(Lead)`
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

export default function OutreachPage() {
  const data = useStaticQuery<Data>(graphql`
    query OutreachPage {
      contentfulContentList(title: { eq: "Outreach List" }) {
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

  const outreachContent =
    organizations.length > 0 ? (
      <StyledOrganizationCardList organizations={organizations} />
    ) : (
      <NoOutreachesNotice>
        No outreaches listed… <br />
        Check back soon!
      </NoOutreachesNotice>
    );

  return (
    <>
      <SEO title="Outreach" />
      <Layout>
        <h1>Outreach</h1>
        <CenteredTextColumn>
          <Lead>
            Many community organizations that improve the lives of others call
            the Community Church home.
          </Lead>
          <p>
            <ExternalLink href="https://www.syossetadvance.com/articles/childrens-orchestra-society-sets-up-new-home-base-in-syosset/">
              Learn about our relationship with the Children’s Orchestra Society
            </ExternalLink>
            .
          </p>
        </CenteredTextColumn>
        {outreachContent}
      </Layout>
    </>
  );
}

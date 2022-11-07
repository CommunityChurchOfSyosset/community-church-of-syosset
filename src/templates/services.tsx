import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import ServiceCardList, {
  Props as ServiceCardListProps,
} from '../components/ServiceCardList';
import { baseline, breakpoint } from '../style';

export const query = graphql`
  query ServicesPageTemplate($limit: Int!, $skip: Int) {
    allContentfulService(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          date
          id
          image {
            description
            gatsbyImageData(height: 72, layout: FIXED, quality: 100, width: 72)
          }
          preacher {
            name
          }
          slug
          title
        }
      }
    }
  }
`;

const NoServicesNotice = styled(Lead)`
  font-weight: bold;
  text-align: center;
`;

const StyledPagination = styled(Pagination)`
  margin-bottom: calc(6 * ${baseline});
`;

const StyledServiceCardList = styled(ServiceCardList)`
  @media (min-width: ${breakpoint.md}) {
    display: grid;
    gap: calc(6 * ${baseline});
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoint.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export interface Props {
  readonly data: {
    readonly allContentfulService: {
      readonly edges: readonly {
        readonly node: ServiceCardListProps['services'][number];
      }[];
    };
  };
  readonly pageContext: {
    readonly pageIsIndex?: boolean;
    readonly pageNumber: number;
    readonly totalPages: number;
  };
}

export default function ServicesPageTemplate(props: Props) {
  const services = props.data.allContentfulService.edges.map(
    ({ node }) => node
  );

  return (
    <>
      <SEO
        title={
          props.pageContext.pageIsIndex
            ? 'Services'
            : `Services: Page ${props.pageContext.pageNumber}`
        }
      />
      <Layout>
        <h1>Services</h1>
        <CenteredTextColumn>
          {props.pageContext.pageIsIndex ? (
            <p>
              Miss a Sunday? Want to hear what our pastor and guest preachers
              have to say?
            </p>
          ) : (
            <Lead>Page {props.pageContext.pageNumber}</Lead>
          )}
          <p>Click on a past service to watch it and learn more.</p>
        </CenteredTextColumn>
        {services.length ? (
          <StyledServiceCardList services={services} />
        ) : (
          <NoServicesNotice>
            No services available… <br />
            Check back soon!
          </NoServicesNotice>
        )}
        {props.pageContext.totalPages > 1 && (
          <CenteredTextColumn>
            <StyledPagination
              lastPageNumber={props.pageContext.totalPages}
              pageNumber={props.pageContext.pageNumber}
              urlRoot="services"
            />
          </CenteredTextColumn>
        )}
      </Layout>
    </>
  );
}

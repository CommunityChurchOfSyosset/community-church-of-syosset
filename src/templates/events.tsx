import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import EventCardList, {
  Props as EventCardListProps,
} from '../components/EventCardList';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import { baseline, breakpoint } from '../style';

export const query = graphql`
  query EventsPageTemplate($limit: Int!, $skip: Int) {
    allContentfulEvent(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: ASC }
    ) {
      edges {
        node {
          date
          id
          image {
            description
            gatsbyImageData(height: 72, layout: FIXED, quality: 100, width: 72)
          }
          slug
          title
        }
      }
    }
  }
`;

const NoEventsNotice = styled(Lead)`
  font-weight: bold;
  text-align: center;
`;

const StyledEventCardList = styled(EventCardList)`
  margin-bottom: calc(6 * ${baseline});

  @media (min-width: ${breakpoint.md}) {
    display: grid;
    gap: calc(6 * ${baseline});
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoint.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledPagination = styled(Pagination)`
  margin-bottom: calc(6 * ${baseline});
`;

export interface Props {
  readonly data: {
    readonly allContentfulEvent: {
      readonly edges: {
        readonly node: EventCardListProps['events'][number];
      }[];
    };
  };
  readonly pageContext: {
    readonly pageIsIndex?: boolean;
    readonly pageNumber: number;
    readonly totalPages: number;
  };
}

export default function EventsPageTemplate(props: Props) {
  const events = props.data.allContentfulEvent.edges.map(({ node }) => node);

  return (
    <>
      <SEO
        title={
          props.pageContext.pageIsIndex
            ? 'Events'
            : `Events: Page ${props.pageContext.pageNumber}`
        }
      />
      <Layout>
        <h1>Events</h1>
        <CenteredTextColumn>
          {props.pageContext.pageIsIndex ? (
            <>
              <Lead>We are more than just Sunday morning.</Lead>
              <p>
                Join us for one of our upcoming social gatherings or special
                services.
              </p>
            </>
          ) : (
            <Lead>Page {props.pageContext.pageNumber}</Lead>
          )}
          <p>Click on an event to see details.</p>
        </CenteredTextColumn>
        {events.length ? (
          <StyledEventCardList events={events} />
        ) : (
          <NoEventsNotice>
            No upcoming events… <br />
            Check back soon!
          </NoEventsNotice>
        )}
        {props.pageContext.totalPages > 1 && (
          <CenteredTextColumn>
            <StyledPagination
              lastPageNumber={props.pageContext.totalPages}
              pageNumber={props.pageContext.pageNumber}
              urlRoot="events"
            />
          </CenteredTextColumn>
        )}
      </Layout>
    </>
  );
}

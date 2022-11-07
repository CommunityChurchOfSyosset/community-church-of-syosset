import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import ImageGalleryCardList, {
  Props as ImageGalleryCardListProps,
} from '../components/ImageGalleryCardList';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import { baseline } from '../style';

export const query = graphql`
  query ImageGalleriesPageTemplate($limit: Int!, $skip: Int) {
    allContentfulImageGallery(
      limit: $limit
      skip: $skip
      sort: { fields: title, order: ASC }
    ) {
      edges {
        node {
          id
          images {
            description
            gatsbyImageData(
              height: 272
              layout: FIXED
              quality: 100
              width: 272
            )
          }
          slug
          title
        }
      }
    }
  }
`;

const NoGalleriesNotice = styled(Lead)`
  font-weight: bold;
  text-align: center;
`;

const StyledImageGalleryCardList = styled(ImageGalleryCardList)`
  margin-bottom: calc(6 * ${baseline});
`;

const StyledPagination = styled(Pagination)`
  margin-bottom: calc(6 * ${baseline});
`;

export interface Props {
  readonly data: {
    readonly allContentfulImageGallery: {
      readonly edges: readonly {
        readonly node: ImageGalleryCardListProps['imageGalleries'][number];
      }[];
    };
  };
  readonly pageContext: {
    readonly pageIsIndex?: boolean;
    readonly pageNumber: number;
    readonly totalPages: number;
  };
}

export default function ImageGalleriesPageTemplate(props: Props) {
  const imageGalleries = props.data.allContentfulImageGallery.edges.map(
    ({ node }) => node
  );

  return (
    <>
      <SEO
        title={
          props.pageContext.pageIsIndex
            ? 'Images'
            : `Images: Page ${props.pageContext.pageNumber}`
        }
      />
      <Layout>
        <h1>Images</h1>
        <CenteredTextColumn>
          {props.pageContext.pageIsIndex ? (
            <>
              <Lead>
                Want to see what we are all about or revisit a past event?
              </Lead>
            </>
          ) : (
            <Lead>Page {props.pageContext.pageNumber}</Lead>
          )}
          <p>Click on an gallery to see more images.</p>
        </CenteredTextColumn>
        {imageGalleries.length ? (
          <StyledImageGalleryCardList imageGalleries={imageGalleries} />
        ) : (
          <NoGalleriesNotice>
            No image galleries… <br />
            Check back soon!
          </NoGalleriesNotice>
        )}
        {props.pageContext.totalPages > 1 && (
          <CenteredTextColumn>
            <StyledPagination
              lastPageNumber={props.pageContext.totalPages}
              pageNumber={props.pageContext.pageNumber}
              urlRoot="images"
            />
          </CenteredTextColumn>
        )}
      </Layout>
    </>
  );
}

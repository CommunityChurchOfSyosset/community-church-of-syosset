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
import FixedImage, { Props as FixedImageProps } from '../components/FixedImage';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import SEO from '../components/SEO';
import { baseline } from '../style';

export const query = graphql`
  query PersonTemplate($id: String!) {
    contentfulPerson(id: { eq: $id }) {
      biography {
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
      image {
        description
        gatsbyImageData(height: 272, layout: FIXED, quality: 100, width: 272)
      }
      name
      role
    }
  }
`;

const ImageFrame = styled.div`
  display: flex;
  justify-content: space-around;
  margin: calc(6 * ${baseline}) 0;
`;

const StyledFixedImage = styled(FixedImage)`
  flex-shrink: 0;
  height: calc(68 * ${baseline});
  width: calc(68 * ${baseline});
`;

export interface Props {
  readonly data: {
    readonly contentfulPerson: {
      readonly biography?: RenderRichTextData<
        ContentfulRichTextGatsbyReference
      >;
      readonly image: FixedImageProps['image'];
      readonly name: string;
      readonly role: string;
    };
  };
}

export default function PersonTemplate(props: Props) {
  return (
    <>
      <SEO title={props.data.contentfulPerson.name} />
      <Layout>
        <h1>{props.data.contentfulPerson.name}</h1>
        <CenteredTextColumn>
          <ImageFrame>
            <StyledFixedImage
              image={props.data.contentfulPerson.image}
              imageWrapperStyle={{ display: 'block' }}
              placeholderIcon="user"
              placeholderIconSize={`calc(62 * ${baseline})`}
            />
          </ImageFrame>
          <Lead>{props.data.contentfulPerson.role}</Lead>
          {props.data.contentfulPerson.biography ? (
            renderRichText(props.data.contentfulPerson.biography, {
              renderNode: {
                'embedded-asset-block': node =>
                  node.data.target.gatsbyImageData ? (
                    <GatsbyImage
                      alt={node.data.target.description}
                      image={node.data.target.gatsbyImageData}
                    />
                  ) : null,
              },
            })
          ) : (
            <p>No biography yet… Check back soon!</p>
          )}
        </CenteredTextColumn>
      </Layout>
    </>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React, { useState } from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../components/CenteredTextColumn';
import Layout from '../components/Layout';
import PageButtons from '../components/PageButtons';
import SEO from '../components/SEO';
import ShareSection from '../components/ShareSection';
import { baseline, breakpoint, color } from '../style';

export const query = graphql`
  query ImageGallery($id: String!) {
    contentfulImageGallery(id: { eq: $id }) {
      description {
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
      images {
        description
        file {
          details {
            image {
              width
            }
          }
        }
        gatsbyImageData(layout: CONSTRAINED)
        id
      }
      title
    }
  }
`;

const Columns = styled.div`
  column-gap: calc(6 * ${baseline});
  margin-bottom: calc(6 * ${baseline});

  @media (min-width: ${breakpoint.md}) {
    columns: 2;
  }

  @media (min-width: ${breakpoint.lg}) {
    columns: 3;
  }
`;

interface SelectedImageContainerProps {
  readonly maxWidth?: number;
}

const SelectedImageContainer = styled.div<SelectedImageContainerProps>`
  display: flex;
  height: auto;
  max-width: ${props => props.maxWidth}px;
  max-height: 100%;
  width: 100%;
`;

const SelectedImage = styled(GatsbyImage)`
  flex: 1;
  max-height: 100%;
`;

interface ModalProps {
  readonly isVisible?: boolean;
  readonly maxWidth?: number;
}

const Modal = styled.div<ModalProps>`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  padding: calc(6 * ${baseline});
  position: fixed;
  top: 0;
  transition: opacity 500ms;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  width: 100%;
  z-index: 1;

  &.hiding {
    visibility: visible;
  }
`;

const StyledButton = styled.button`
  align-items: center;
  background: none;
  border: 1px solid ${color.lightGray};
  border-radius: ${baseline};
  display: flex;
  justify-content: space-around;
  margin-bottom: calc(6 * ${baseline});
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: calc(3 * ${baseline});
  top: calc(3 * ${baseline});
  z-index: 1;

  &:hover {
    cursor: pointer;
  }

  && {
    font-size: calc(12 * ${baseline});
  }
`;

const StyledImage = styled(GatsbyImage)`
  border-radius: ${baseline};
  display: inline-block;
  height: auto;
  width: 100%;
`;

const StyledPageButtons = styled(PageButtons)`
  margin-bottom: calc(6 * ${baseline});
`;

interface Image {
  readonly description?: string;
  readonly file: {
    readonly details: {
      readonly image: {
        readonly width: number;
      };
    };
  };
  readonly gatsbyImageData: IGatsbyImageData;
  readonly id: string;
}

export interface Props {
  readonly data: {
    readonly contentfulImageGallery: {
      readonly description?: RenderRichTextData<
        ContentfulRichTextGatsbyReference
      >;
      readonly images: readonly Image[];
      readonly title: string;
    };
  };
  readonly pageContext: {
    readonly nextSlug?: string;
    readonly prevSlug?: string;
  };
}

export default function ImageGalleryTemplate(props: Props) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const images = props.data.contentfulImageGallery.images.map(image => (
    <StyledButton key={image.id} onClick={() => setSelectedImage(image)}>
      <StyledImage
        alt={image.description ?? ''}
        image={image.gatsbyImageData}
      />
    </StyledButton>
  ));

  return (
    <>
      <SEO title={props.data.contentfulImageGallery.title} />
      <Layout>
        <h1>{props.data.contentfulImageGallery.title}</h1>
        {props.data.contentfulImageGallery.description && (
          <CenteredTextColumn>
            {renderRichText(props.data.contentfulImageGallery.description, {
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
          </CenteredTextColumn>
        )}
        <Columns>{images}</Columns>
        <Modal
          isVisible={!!selectedImage}
          onClick={() => setSelectedImage(null)}
        >
          <StyledFontAwesomeIcon color={color.ucc.red} icon="times" />
          {selectedImage && (
            <SelectedImageContainer
              maxWidth={selectedImage.file.details.image.width}
            >
              <SelectedImage
                alt={selectedImage.description || ''}
                image={selectedImage.gatsbyImageData}
                objectFit="contain"
              />
            </SelectedImageContainer>
          )}
        </Modal>
        <CenteredTextColumn>
          <ShareSection contentType="image gallery" />
          {(props.pageContext.nextSlug || props.pageContext.prevSlug) && (
            <StyledPageButtons
              nextSlug={props.pageContext.nextSlug}
              prevSlug={props.pageContext.prevSlug}
              rootSlug="images"
            />
          )}
        </CenteredTextColumn>
      </Layout>
    </>
  );
}

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React, { useState } from 'react';
import styled from 'styled-components';

import CCSLogo from '../components/CCSLogo';
import FlexContainer from '../components/FlexContainer';
import Layout from '../components/Layout';
import Lead from '../components/Lead';
import LinkButton from '../components/LinkButton';
import Modal from '../components/Modal';
import SEO from '../components/SEO';
import { baseline, color } from '../style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 33em;
`;

const StyledLayout = styled(Layout)`
  color: ${color.white};
`;

const StyledLinkButton = styled(LinkButton)`
  background-color: ${color.white};
  border: 1px solid ${color.white};
  color: ${color.primary};
  flex: 1;
  margin: 0 calc(3 * ${baseline}) calc(6 * ${baseline});
  padding: calc(3 * ${baseline} - 1px);
  transition: background-color 500ms, color 500ms, filter 500ms;

  &:focus {
    filter: drop-shadow(0 0 5px ${color.black});
  }

  &:hover {
    background-color: transparent;
    color: ${color.white};
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

interface Data {
  readonly alert?: {
    readonly content: RenderRichTextData<
      ContentfulRichTextGatsbyReference
    > | null;
  };
  readonly backgroundImage?: {
    readonly gatsbyImageData: IGatsbyImageData;
  };
  readonly backgroundVideo?: {
    readonly file: {
      readonly url: string;
    };
  };
}

export default function HomePage() {
  const data = useStaticQuery<Data>(graphql`
    query HomePage {
      alert: contentfulMessage(title: { eq: "Homepage Alert" }) {
        content {
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
      }
      backgroundImage: contentfulAsset(
        title: { eq: "Homepage Background Image" }
      ) {
        gatsbyImageData(layout: FULL_WIDTH)
      }
      backgroundVideo: contentfulAsset(
        title: { eq: "Homepage Background Video" }
      ) {
        file {
          url
        }
      }
    }
  `);

  const [alertIsShown, setAlertIsShown] = useState<boolean>(!!data.alert);

  const backgroundImageStack = data.backgroundImage
    ? [
        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
        data.backgroundImage.gatsbyImageData,
      ]
    : ['linear-gradient(rgba(0, 191, 255, 1), rgba(0, 191, 255, 1))'];

  return (
    <>
      <SEO title="Home" />
      {data.alert?.content && (
        <Modal
          isShown={alertIsShown}
          onDismiss={() => handleModalDismiss(setAlertIsShown)}
        >
          {renderRichText(data.alert.content, {
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
        </Modal>
      )}
      <StyledLayout
        backgroundImage={backgroundImageStack}
        backgroundVideoOverlay="rgba(0, 0, 0, 0.5)"
        backgroundVideoUrl={
          data.backgroundVideo && data.backgroundVideo.file.url
        }
        bodyDisplay="flex"
      >
        <Container>
          <h1>
            <CCSLogo whiteScale />
          </h1>
          <Lead>
            No matter who you are, <br />
            or where you are on life’s journey, <br />
            you are welcome here!
          </Lead>
          <p>
            An open and affirming congregation of the United Church of Christ,
            where God is still speaking.
          </p>
          <FlexContainer>
            <StyledLinkButton to="/visit">Visit us</StyledLinkButton>
            <StyledLinkButton to="/about/pastor">A welcome</StyledLinkButton>
          </FlexContainer>
        </Container>
      </StyledLayout>
    </>
  );
}

function handleModalDismiss(
  setAlertIsShown: React.Dispatch<React.SetStateAction<boolean>>
) {
  setAlertIsShown(false);
}

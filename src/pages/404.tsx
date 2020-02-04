import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Lead from '../components/Lead';
import LinkButton from '../components/LinkButton';
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
  background-color: ${color.black};
  color: ${color.white};
`;

const StyledLinkButton = styled(LinkButton)`
  background-color: transparent;
  border: 1px solid ${color.white};
  margin-bottom: calc(6 * ${baseline});
  padding: calc(3 * ${baseline} - 1px);

  &:focus {
    filter: drop-shadow(0 0 5px ${color.white});
  }

  &:hover {
    background-color: ${color.white};
    color: ${color.black};
  }
`;

type Data = {
  contentfulAsset: {
    fluid: FluidObject;
  };
};

const Error404Page: React.FC = () => {
  const data = useStaticQuery<Data>(graphql`
    query Error404Page {
      contentfulAsset(title: { eq: "Error 404 Page Background Image" }) {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  `);

  const backgroundImageStack = [
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
    data.contentfulAsset.fluid,
  ];

  return (
    <>
      <SEO title="404: Page not found" />
      <StyledLayout backgroundImage={backgroundImageStack} bodyDisplay="flex">
        <Container>
          <h1>404: Page not&nbsp;found</h1>
          <Lead>It seems that you have lost your way.</Lead>
          <p>
            It’s okay: there is <em>always</em> a way back.
          </p>
          <StyledLinkButton to="/">Go home</StyledLinkButton>
        </Container>
      </StyledLayout>
    </>
  );
};

export default Error404Page;

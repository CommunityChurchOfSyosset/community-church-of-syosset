import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../../components/CenteredTextColumn';
import FlexContainer from '../../components/FlexContainer';
import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';
import SEO from '../../components/SEO';
import VideoPlayer from '../../components/VideoPlayer';
import { baseline } from '../../style';

const PastorName = styled.h2`
  text-align: center;
`;

const StyledLinkButton = styled(LinkButton)`
  flex: 1;
  margin: 0 calc(3 * ${baseline}) calc(6 * ${baseline});

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const StyledVideoPlayer = styled(VideoPlayer)`
  border-radius: ${baseline};
  margin: calc(6 * ${baseline}) 0;
`;

interface Data {
  readonly contentfulJsonObject: {
    readonly json: {
      readonly pastorsMessageVideoUrl: string;
    };
  };
  readonly contentfulPerson: {
    readonly name: string;
  };
}

export default function PastorPage() {
  const data = useStaticQuery<Data>(graphql`
    query PastorPage {
      contentfulJsonObject(title: { eq: "Website Data" }) {
        json {
          pastorsMessageVideoUrl
        }
      }
      contentfulPerson(role: { eq: "Pastor" }) {
        name
      }
    }
  `);

  return (
    <>
      <SEO title="Pastor’s Message" />
      <Layout>
        <h1>Pastor’s message</h1>
        <CenteredTextColumn>
          <section>
            <PastorName>
              A welcome from <br />
              {data.contentfulPerson.name}
            </PastorName>
            <StyledVideoPlayer
              url={data.contentfulJsonObject.json.pastorsMessageVideoUrl}
            />
          </section>
          <FlexContainer>
            <StyledLinkButton to="/visit">Visit us</StyledLinkButton>
            <StyledLinkButton to="/about">Who we are</StyledLinkButton>
          </FlexContainer>
        </CenteredTextColumn>
      </Layout>
    </>
  );
}

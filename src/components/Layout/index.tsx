import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Body, { BackgroundImageStack } from './Body';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import { breakpoint, color } from '../../style';
import '../../icon-library';

fontAwesomeConfig.autoAddCss = false;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 100vh;
`;

const StyledBody = styled(Body)`
  flex: auto;
`;

const StyledFooter = styled(Footer)`
  flex: initial;
  margin-top: auto;
`;

const StyledHeader = styled(Header)`
  box-shadow: 0 0 5px ${color.black};
  flex: initial;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export interface Props {
  readonly backgroundImage?: BackgroundImageStack;
  readonly backgroundVideoOverlay?: string;
  readonly backgroundVideoUrl?: string;
  readonly bodyDisplay?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

interface Data {
  readonly contentfulJsonObject: {
    readonly json: {
      readonly copyright: {
        readonly holder: string;
        readonly initialYear: number;
      };
      readonly organization: {
        readonly address: {
          readonly city: string;
          readonly state: string;
          readonly street: string;
          readonly zip: string;
        };
        readonly name: string;
        readonly phone: string;
      };
      readonly socialMedia: {
        readonly facebook: {
          readonly slug: string;
        };
      };
    };
  };
}

export default function Layout(props: Props) {
  const data = useStaticQuery<Data>(graphql`
    query LayoutComponent {
      contentfulJsonObject(title: { eq: "Website Data" }) {
        json {
          copyright {
            holder
            initialYear
          }
          organization {
            address {
              city
              state
              street
              zip
            }
            name
            phone
          }
          socialMedia {
            facebook {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />
      <Container className={props.className}>
        <StyledHeader layoutBreakpoint={breakpoint.lg} />
        <StyledBody
          backgroundImage={props.backgroundImage}
          backgroundVideoOverlay={props.backgroundVideoOverlay}
          backgroundVideoUrl={props.backgroundVideoUrl}
          display={props.bodyDisplay}
        >
          {props.children}
        </StyledBody>
        <StyledFooter
          copyright={data.contentfulJsonObject.json.copyright}
          organization={data.contentfulJsonObject.json.organization}
          socialMedia={data.contentfulJsonObject.json.socialMedia}
        />
      </Container>
    </>
  );
}

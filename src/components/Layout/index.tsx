import { graphql, useStaticQuery } from 'gatsby';
import { IFluidObject } from 'gatsby-background-image';
import React from 'react';
import styled from 'styled-components';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Body from './Body';
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

type Props = {
  backgroundImage?: IFluidObject | IFluidObject[] | (IFluidObject | string)[];
  backgroundVideoOverlay?: string;
  backgroundVideoUrl?: string;
  bodyDisplay?: string;
  children: React.ReactNode;
  className?: string;
};

type Data = {
  contentfulJsonObject: {
    json: {
      copyright: {
        holder: string;
        initialYear: number;
      };
      organization: {
        address: {
          city: string;
          state: string;
          street: string;
          zip: string;
        };
        name: string;
        phone: string;
      };
      socialMedia: {
        facebook: {
          slug: string;
        };
      };
    };
  };
};

const Layout: React.FC<Props> = ({
  backgroundImage,
  backgroundVideoOverlay,
  backgroundVideoUrl,
  bodyDisplay,
  children,
  className,
}) => {
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
      <Container className={className}>
        <StyledHeader layoutBreakpoint={breakpoint.lg} />
        <StyledBody
          backgroundImage={backgroundImage}
          backgroundVideoOverlay={backgroundVideoOverlay}
          backgroundVideoUrl={backgroundVideoUrl}
          display={bodyDisplay}
        >
          {children}
        </StyledBody>
        <StyledFooter
          copyright={data.contentfulJsonObject.json.copyright}
          organization={data.contentfulJsonObject.json.organization}
          socialMedia={data.contentfulJsonObject.json.socialMedia}
        />
      </Container>
    </>
  );
};

export default Layout;

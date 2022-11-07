import BackgroundImage from 'gatsby-background-image';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import React from 'react';
import styled from 'styled-components';

import { baseline, breakpoint } from '../../style';
import BackgroundVideo from '../BackgroundVideo';

interface BreakpointContainerProps {
  readonly display?: string;
}

const BreakpointContainer = styled.div<BreakpointContainerProps>`
  ${props => props.display && `display: ${props.display};`}
  margin: 0 auto;
  width: 100%;

  @media (min-width: ${breakpoint.sm}) {
    max-width: 540px;
  }

  @media (min-width: ${breakpoint.md}) {
    max-width: 720px;
  }

  @media (min-width: ${breakpoint.lg}) {
    max-width: 960px;
  }

  @media (min-width: ${breakpoint.xl}) {
    max-width: 1140px;
  }
`;

interface BackgroundVideoContainerProps {
  readonly overlay?: string;
}

const BackgroundVideoContainer = styled.main<BackgroundVideoContainerProps>`
  background-color: ${props => props.overlay};
  display: flex;
  padding: 0 calc(3 * ${baseline});
  position: relative;
  overflow: hidden;
`;

const Container = styled.main`
  display: flex;
  padding: 0 calc(3 * ${baseline});
`;

const StyledBackgroundImage = styled(BackgroundImage)`
  display: flex;
  padding: 0 calc(3 * ${baseline});
`;

export type BackgroundImageStack =
  | IGatsbyImageData
  | IGatsbyImageData[]
  | (IGatsbyImageData | string)[];

export interface Props {
  readonly backgroundImage?: BackgroundImageStack;
  readonly backgroundVideoOverlay?: string;
  readonly backgroundVideoUrl?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly display?: string;
}

export default function Body(props: Props) {
  if (props.backgroundVideoUrl) {
    return (
      <BackgroundVideoContainer
        className={props.className}
        overlay={props.backgroundVideoOverlay}
      >
        <BackgroundVideo url={props.backgroundVideoUrl} />
        <BreakpointContainer display={props.display}>
          {props.children}
        </BreakpointContainer>
      </BackgroundVideoContainer>
    );
  }

  if (props.backgroundImage) {
    const bgImage = convertToBgImage(props.backgroundImage);

    return (
      <StyledBackgroundImage
        className={props.className}
        Tag="main"
        {...bgImage}
      >
        <BreakpointContainer display={props.display}>
          {props.children}
        </BreakpointContainer>
      </StyledBackgroundImage>
    );
  }

  return (
    <Container className={props.className}>
      <BreakpointContainer display={props.display}>
        {props.children}
      </BreakpointContainer>
    </Container>
  );
}

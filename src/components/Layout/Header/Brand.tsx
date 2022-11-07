import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { baseline, color } from '../../../style';

interface ContainerProps {
  readonly marginBreakpoint: string;
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  display: flex;
  margin-right: calc(6 * ${baseline});

  @media (min-width: ${props => props.marginBreakpoint}) {
    margin-right: 0;
  }
`;

interface StyledLinkProps {
  readonly paddingBreakpoint: string;
}

const StyledLink = styled(Link)<StyledLinkProps>`
  transition: filter 500ms;
  width: 100%;

  &:focus {
    filter: drop-shadow(0 0 5px ${color.primary});
  }

  @media (min-width: ${props => props.paddingBreakpoint}) {
    padding: calc(3 * ${baseline});
  }
`;

export interface Props {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly layoutBreakpoint: string;
}

export default function Brand(props: Props) {
  return (
    <Container
      className={props.className}
      marginBreakpoint={props.layoutBreakpoint}
    >
      <StyledLink paddingBreakpoint={props.layoutBreakpoint} to="/">
        {props.children}
      </StyledLink>
    </Container>
  );
}

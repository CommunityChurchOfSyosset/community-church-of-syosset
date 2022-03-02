import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { baseline, color } from '../../../style';

type ContainerProps = {
  marginBreakpoint: string;
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  display: flex;
  margin-right: calc(6 * ${baseline});

  @media (min-width: ${props => props.marginBreakpoint}) {
    margin-right: 0;
  }
`;

type StyledLinkProps = {
  paddingBreakpoint: string;
}

const StyledLink = styled(Link) <StyledLinkProps>`
  transition: filter 500ms;
  width: 100%;

  &:focus {
    filter: drop-shadow(0 0 5px ${color.primary});
  }

  @media (min-width: ${props => props.paddingBreakpoint}) {
    padding: calc(3 * ${baseline});
  }
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  layoutBreakpoint: string;
};

const Brand: React.FC<Props> = ({ children, className, layoutBreakpoint }) => (
  <Container className={className} marginBreakpoint={layoutBreakpoint}>
    <StyledLink paddingBreakpoint={layoutBreakpoint} to="/">{children}</StyledLink>
  </Container>
);

export default Brand;

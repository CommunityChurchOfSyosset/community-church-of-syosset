import React from 'react';
import styled from 'styled-components';

import Brand from './Brand';
import Navigation from './Navigation';
import CCSLogo from '../../CCSLogo';
import { baseline, color } from '../../../style';

type ContainerProps = {
  paddingBreakpoint: string;
}

const Container = styled.header<ContainerProps>`
  background-color: ${color.white};
  display: flex;
  justify-content: space-between;
  padding: calc(3 * ${baseline});

  @media (min-width: ${props => props.paddingBreakpoint}) {
    padding: 0;
  }
`;

const StyledBrand = styled(Brand)``;

const StyledCCSLogo = styled(CCSLogo)`
  display: block;
  height: calc(9 * ${baseline});
`;

type Props = {
  className?: string;
  layoutBreakpoint: string;
};

const Header: React.FC<Props> = ({ className, layoutBreakpoint }) => (
  <Container className={className} paddingBreakpoint={layoutBreakpoint}>
    <StyledBrand layoutBreakpoint={layoutBreakpoint}>
      <StyledCCSLogo />
    </StyledBrand>
    <Navigation toggleBreakpoint={layoutBreakpoint} />
  </Container>
);

export default Header;

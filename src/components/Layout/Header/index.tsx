import React from 'react';
import styled from 'styled-components';

import Brand from './Brand';
import Navigation from './Navigation';
import CCSLogo from '../../CCSLogo';
import { baseline, color } from '../../../style';

interface ContainerProps {
  readonly paddingBreakpoint: string;
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

export interface Props {
  readonly className?: string;
  readonly layoutBreakpoint: string;
}

export default function Header(props: Props) {
  return (
    <Container
      className={props.className}
      paddingBreakpoint={props.layoutBreakpoint}
    >
      <StyledBrand layoutBreakpoint={props.layoutBreakpoint}>
        <StyledCCSLogo />
      </StyledBrand>
      <Navigation toggleBreakpoint={props.layoutBreakpoint} />
    </Container>
  );
}

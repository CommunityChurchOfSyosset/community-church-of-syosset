import styled from 'styled-components';

import { breakpoint, color } from '../../../../style';

type Props = {
  headerHeight: number;
};

const NavList = styled.ul<Props>`
  background-color: ${color.body};
  color: ${color.body};
  height: calc(100vh - ${props => props.headerHeight}px);
  left: 0;
  list-style: none;
  opacity: 0;
  overflow-y: auto;
  padding-left: 0;
  position: absolute;
  top: ${props => props.headerHeight}px;
  transition: opacity 500ms;
  visibility: hidden;
  width: 100%;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &.hiding {
    opacity: 0;
    visibility: visible;
  }

  @media (min-width: ${breakpoint.md}) {
    background: none;
    display: flex;
    height: auto;
    opacity: 1;
    overflow-y: hidden;
    padding: 0;
    position: static;
    visibility: visible;
    width: auto;
  }
`;

export default NavList;

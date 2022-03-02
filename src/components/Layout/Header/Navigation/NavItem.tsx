import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { baseline, color } from '../../../../style';

type ListItemProps = {
  borderBreakpoint: string;
}

const ListItem = styled.li<ListItemProps>`
  border-top: 1px solid ${color.body};

  @media (min-width: ${props => props.borderBreakpoint}) {
    border-top: 0;
  }
`;

type StyledLinkProps = {
  layoutBreakpoint: string;
}

const StyledLink = styled(Link) <StyledLinkProps>`
  background-color: ${color.white};
  display: block;
  padding: calc(2 * ${baseline});

  &.active {
    background-color: ${color.primary};
    color: ${color.white};
  }

  @media (min-width: ${props => props.layoutBreakpoint}) {
    align-items: center;
    display: flex;
    height: 100%;
    padding: calc(3 * ${baseline});
  }
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  layoutBreakpoint: string;
  to: string;
};

const NavItem: React.FC<Props> = ({ children, className, layoutBreakpoint, to }) => (
  <ListItem borderBreakpoint={layoutBreakpoint} className={className}>
    <StyledLink activeClassName="active" layoutBreakpoint={layoutBreakpoint} to={to}>
      {children}
    </StyledLink>
  </ListItem>
);

export default NavItem;

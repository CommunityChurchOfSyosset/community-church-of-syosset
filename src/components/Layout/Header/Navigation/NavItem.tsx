import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { baseline, color } from '../../../../style';

interface ListItemProps {
  readonly borderBreakpoint: string;
}

const ListItem = styled.li<ListItemProps>`
  border-top: 1px solid ${color.body};

  @media (min-width: ${props => props.borderBreakpoint}) {
    border-top: 0;
  }
`;

interface StyledLinkProps {
  readonly layoutBreakpoint: string;
}

const StyledLink = styled(Link)<StyledLinkProps>`
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

export interface Props {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly layoutBreakpoint: string;
  readonly to: string;
}

export default function NavItem(props: Props) {
  return (
    <ListItem
      borderBreakpoint={props.layoutBreakpoint}
      className={props.className}
    >
      <StyledLink
        activeClassName="active"
        layoutBreakpoint={props.layoutBreakpoint}
        to={props.to}
      >
        {props.children}
      </StyledLink>
    </ListItem>
  );
}

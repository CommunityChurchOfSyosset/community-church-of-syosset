import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const StyledButton = styled(Button)`
  display: block;
  text-align: center;

  &:hover {
    text-decoration: none;
  }
`;

export interface Props {
  readonly activeClassName?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly to: string;
}

export default function LinkButton(props: Props) {
  return (
    <StyledButton
      activeClassName={props.activeClassName}
      as={Link}
      className={props.className}
      to={props.to}
    >
      {props.children}
    </StyledButton>
  );
}

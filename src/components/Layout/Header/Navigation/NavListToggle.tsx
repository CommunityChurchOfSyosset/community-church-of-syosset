import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { color, typography } from '../../../../style';

interface ButtonProps {
  readonly displayBreakpoint: string;
}

const Button = styled.button<ButtonProps>`
  background: none;
  border: none;
  font-size: ${typography.fontSize.h1.xs};
  line-height: ${typography.lineHeight.h1.xs};
  transition: filter 500ms;
  width: ${typography.fontSize.h1.xs};

  &:focus {
    filter: drop-shadow(0 0 5px ${color.primary});
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${props => props.displayBreakpoint}) {
    display: none;
  }
`;

export interface Props {
  readonly displayBreakpoint: string;
  readonly navListIsShown: boolean;
  readonly setNavListIsHiding: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setNavListIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavListToggle(props: Props) {
  return (
    <Button displayBreakpoint={props.displayBreakpoint}>
      <FontAwesomeIcon
        color={color.body}
        icon={props.navListIsShown ? 'times' : 'bars'}
        onClick={() =>
          handleClick(
            props.navListIsShown,
            props.setNavListIsShown,
            props.setNavListIsHiding
          )
        }
      />
    </Button>
  );
}

function handleClick(
  navListIsShown: boolean,
  setNavListIsShown: React.Dispatch<React.SetStateAction<boolean>>,
  setNavListIsHiding: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (navListIsShown) {
    hideNavList(setNavListIsHiding);
  }

  setNavListIsShown(!navListIsShown);
}

function hideNavList(
  setNavListIsHiding: React.Dispatch<React.SetStateAction<boolean>>
) {
  const TRANSITION_DURATION = 500;
  setNavListIsHiding(true);
  setTimeout(() => setNavListIsHiding(false), TRANSITION_DURATION);
}

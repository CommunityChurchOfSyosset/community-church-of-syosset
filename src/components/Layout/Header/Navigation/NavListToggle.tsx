import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { color, typography } from '../../../../style';

type ButtonProps = {
  displayBreakpoint: string;
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

type Props = {
  displayBreakpoint: string;
  navListIsShown: boolean;
  setNavListIsHiding: React.Dispatch<React.SetStateAction<boolean>>;
  setNavListIsShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavListToggle: React.FC<Props> = ({
  displayBreakpoint,
  navListIsShown,
  setNavListIsHiding,
  setNavListIsShown,
}) => (
  <Button displayBreakpoint={displayBreakpoint}>
    <FontAwesomeIcon
      color={color.body}
      icon={navListIsShown ? 'times' : 'bars'}
      onClick={() =>
        handleClick(navListIsShown, setNavListIsShown, setNavListIsHiding)
      }
    />
  </Button>
);

export default NavListToggle;

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
  setTimeout(() => {
    setNavListIsHiding(false);
  }, TRANSITION_DURATION);
}

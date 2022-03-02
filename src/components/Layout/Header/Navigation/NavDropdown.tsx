import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { baseline, color } from '../../../../style';

type ButtonProps = {
  childIsActive: boolean;
  dropdownListIsShown: boolean;
  layoutBreakpoint: string;
};

const Button = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${props => {
    if (props.dropdownListIsShown) {
      return color.body;
    } else if (props.childIsActive) {
      return color.primary;
    } else {
      return color.white;
    }
  }};
  border: none;
  display: flex;
  justify-content: space-between;
  padding: calc(2 * ${baseline});
  transition: background-color 500ms, color 500ms, filter 500ms;
  width: 100%;

  &:focus {
    filter: drop-shadow(0 0 5px ${color.primary});
  }

  &&:hover {
    background-color: ${color.body};
    color: ${color.white};
    cursor: pointer;
  }

  && {
    color: ${props =>
    props.childIsActive || props.dropdownListIsShown
      ? color.white
      : 'inherit'};
  }

  @media (min-width: ${props => props.layoutBreakpoint}) {
    height: 100%;
    justify-content: center;
    padding: calc(3 * ${baseline});
  }
`;

type DropdownListProps = {
  height: number;
  isShown: boolean;
  layoutBreakpoint: string;
};

const DropdownList = styled.ul<DropdownListProps>`
  background-color: ${color.body};
  height: 0;
  padding-left: calc(2 * ${baseline});
  transition: height 500ms;
  visibility: hidden;

  a {
    background-color: ${color.white};
  }

  a.active {
    background-color: ${color.secondary};
    color: ${color.body};
  }

  li {
    opacity: 0;
    transition: opacity 500ms;
  }

  &.show {
    height: ${props => props.height}px;
    visibility: visible;

    li {
      opacity: 1;
    }
  }

  &.hiding {
    visibility: visible;
  }

  @media (min-width: ${props => props.layoutBreakpoint}) {
    box-shadow: 0 0 5px ${color.black};
    position: absolute;
    z-index: -1;
  }
`;

type ListItemProps = {
  borderBreakpoint: string;
}

const ListItem = styled.li<ListItemProps>`
  border-top: 1px solid ${color.body};

  @media (min-width: ${props => props.borderBreakpoint}) {
    border-top: 0;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5em;
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  dropdownListIsShown: boolean;
  id: string;
  layoutBreakpoint: string;
  setActiveDropdownId: React.Dispatch<React.SetStateAction<string | null>>;
  title: string;
};

const NavDropdown: React.FC<Props> = ({
  children,
  className,
  dropdownListIsShown,
  id,
  layoutBreakpoint,
  setActiveDropdownId,
  title,
}) => {
  const [listHeight, setListHeight] = useState();
  const [dropdownListIsHiding, setDropdownListIsHiding] = useState(false);
  const [childIsActive, setChildIsActive] = useState(false);

  useEffect(() => getAndSetChildIsActive(setChildIsActive, id), []);
  useEffect(() => setListHeightAndlistenForWindowResize(setListHeight, id), []);

  return (
    <ListItem borderBreakpoint={layoutBreakpoint} className={className} >
      <Button
        childIsActive={childIsActive}
        dropdownListIsShown={dropdownListIsShown}
        layoutBreakpoint={layoutBreakpoint}
        onClick={() =>
          handleClick(
            dropdownListIsShown,
            setActiveDropdownId,
            setDropdownListIsHiding,
            id
          )
        }
      >
        {title}
        <StyledFontAwesomeIcon
          icon="chevron-right"
          rotation={dropdownListIsShown ? 90 : undefined}
        />
      </Button>
      <DropdownList
        className={`${dropdownListIsShown ? 'show' : ''}${
          dropdownListIsHiding ? 'hiding' : ''
        }`}
        height={listHeight}
        id={id}
        isShown={dropdownListIsShown}
        layoutBreakpoint={layoutBreakpoint}
      >
        {children}
      </DropdownList>
    </ListItem>
  );
};

export default NavDropdown;

function getAndSetChildIsActive(
  setChildIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) {
  const listElement = document.querySelector(`#${id}`);
  const activeChild = listElement?.querySelector('.active');

  if (activeChild) {
    setChildIsActive(true);
  }
}

function handleClick(
  dropdownListIsShown: boolean,
  setActiveDropdownId: React.Dispatch<React.SetStateAction<string | null>>,
  setDropdownIsHiding: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) {
  if (dropdownListIsShown) {
    setActiveDropdownId(null);
    hideDropdownList(setDropdownIsHiding);
  } else {
    setActiveDropdownId(id);
  }
}

function hideDropdownList(
  setDropdownIsHiding: React.Dispatch<React.SetStateAction<boolean>>
) {
  const TRANSITION_DURATION = 500;

  setDropdownIsHiding(true);
  setTimeout(() => {
    setDropdownIsHiding(false);
  }, TRANSITION_DURATION);
}

function setListHeightAndlistenForWindowResize(
  setListHeight: React.Dispatch<React.SetStateAction<number>>,
  id: string
) {
  getAndSetListHeight(setListHeight, id);

  const handleWindowResize = () => {
    getAndSetListHeight(setListHeight, id);
  };

  window.addEventListener('resize', handleWindowResize);

  return () => window.removeEventListener('resize', handleWindowResize);
}

function getAndSetListHeight(
  setListHeight: React.Dispatch<React.SetStateAction<number>>,
  id: string
) {
  const listElement = document?.querySelector(`#${id}`);
  const numberOfListItems = listElement?.children.length;
  const listItemHeight: number | undefined =
    listElement?.children[0].offsetHeight;

  if (numberOfListItems && listItemHeight) {
    setListHeight(numberOfListItems * listItemHeight);
  }
}

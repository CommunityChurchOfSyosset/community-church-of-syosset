import React, { useEffect } from 'react';
import styled from 'styled-components';

import { baseline, color } from '../style';
import Button from './Button';

const Shroud = styled.div`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

const Window = styled.div`
  background-color: ${color.white};
  border-radius: ${baseline};
  color: ${color.body};
  margin: auto;
  padding: calc(3 * ${baseline});
`;

const Content = styled.div`
  background-color: ${color.white};
  color: ${color.body};
  max-width: 33rem;
`;

export interface Props {
  readonly children: React.ReactNode;
  readonly isShown: boolean;
  readonly onDismiss: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export default function Modal(props: Props) {
  useEffect(() => suppressScroll(props.isShown), [props.isShown]);

  if (props.isShown) {
    return (
      <Shroud>
        <Window>
          <Content>{props.children}</Content>
          <StyledButton onClick={props.onDismiss}>Dismiss</StyledButton>
        </Window>
      </Shroud>
    );
  }

  return null;
}

function suppressScroll(modalIsShown: boolean) {
  const body = document.querySelector('body');

  if (modalIsShown && body !== null) {
    body.classList.add('hide-overflow');
    return () => body.classList.remove('hide-overflow');
  }
}

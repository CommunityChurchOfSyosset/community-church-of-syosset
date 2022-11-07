import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import { baseline, color } from '../style';

const Frame = styled.div`
  align-items: center;
  background-color: ${color.lightGray};
  border: 1px dashed ${color.body};
  border-radius: ${baseline};
  display: flex;
  justify-content: space-around;
`;

interface IconProps {
  readonly fontSize: string;
}

const Icon = styled(FontAwesomeIcon)<IconProps>`
  && {
    font-size: ${props => props.fontSize};
  }
`;

export interface Props {
  readonly className?: string;
  readonly icon: IconProp;
  readonly iconSize: string;
}

export default function ImagePlaceholderIcon(props: Props) {
  return (
    <Frame className={props.className}>
      <Icon fontSize={props.iconSize} icon={props.icon} />
    </Frame>
  );
}

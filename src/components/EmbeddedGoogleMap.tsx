import React from 'react';
import styled from 'styled-components';

import EmbeddedContentFrame, {
  Props as EmbeddedContentFrameProps,
} from './EmbeddedContentFrame';
import { color } from '../style';

const ROOT_URL = 'https://www.google.com/maps/embed/v1';

const IFrame = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledEmbeddedContentFrame = styled(EmbeddedContentFrame)`
  background-color: ${color.lightGray};
`;

export interface Props {
  readonly apiKey: string;
  readonly aspectRatio: EmbeddedContentFrameProps['aspectRatio'];
  readonly className?: string;
  readonly mode: string;
  readonly q?: string;
  readonly title: string;
}

export default function EmbeddedGoogleMap(props: Props) {
  let src = `${ROOT_URL}/${props.mode}?key=${props.apiKey}`;

  if (props.q) {
    src += `&q=${encodeURI(props.q)}`;
  }

  return (
    <StyledEmbeddedContentFrame
      aspectRatio={props.aspectRatio}
      className={props.className}
    >
      <IFrame src={src} title={props.title}>
        <p>
          This embedded Google map cannot be shown because our browser does not
          support HTML <code>iframe</code> elements.
        </p>
      </IFrame>
    </StyledEmbeddedContentFrame>
  );
}

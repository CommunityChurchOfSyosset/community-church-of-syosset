import React from 'react';
import styled from 'styled-components';

const Video = styled.video`
  height: auto;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  z-index: -1;
`;

export interface Props {
  readonly className?: string;
  readonly url: string;
}

export default function BackgroundVideo(props: Props) {
  return (
    <Video
      autoPlay
      className={props.className}
      loop
      muted
      preload="metadata"
      src={props.url}
    />
  );
}

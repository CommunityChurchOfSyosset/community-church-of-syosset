import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import EmbeddedContentFrame from '../components/EmbeddedContentFrame';
import ExternalLink from '../components/ExternalLink';
import { color } from '../style';

const FallbackParagraph = styled.p`
  left: 0;
  position: absolute;
  top: 0;
`;

const Iframe = styled.iframe`
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledEmbeddedContentFrame = styled(EmbeddedContentFrame)`
  background-color: ${color.lightGray};
`;

const Video = styled.video`
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export interface Props {
  readonly className?: string;
  readonly url: string;
}

interface AspectRatio {
  readonly x: number;
  readonly y: number;
}

export default function VideoPlayer(props: Props) {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>({ x: 1, y: 1 });
  useEffect(() => listenForLoadedmetadata(setAspectRatio), []);

  if (props.url.includes('www.youtube.com/embed')) {
    return (
      <StyledEmbeddedContentFrame
        aspectRatio={{ x: 16, y: 9 }}
        className={props.className}
      >
        <Iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={props.url}
        >
          <FallbackParagraph>
            Your browser does not support the HTML <code>&lt;iframe&gt;</code>{' '}
            element.{' '}
            <ExternalLink href={props.url}>
              Click here to watch this video on YouTube
            </ExternalLink>
            .
          </FallbackParagraph>
        </Iframe>
      </StyledEmbeddedContentFrame>
    );
  }

  return (
    <StyledEmbeddedContentFrame
      aspectRatio={aspectRatio}
      className={props.className}
    >
      <Video controls preload="metadata" src={props.url}>
        <FallbackParagraph>
          Your browser does not support the HTML <code>&lt;video&gt;</code>{' '}
          element.{' '}
          <ExternalLink download href={props.url}>
            Click here to download this video
          </ExternalLink>
          .
        </FallbackParagraph>
      </Video>
    </StyledEmbeddedContentFrame>
  );
}

function listenForLoadedmetadata(
  setAspectRatio: React.Dispatch<React.SetStateAction<AspectRatio>>
) {
  const videoElement = document.querySelector('video');

  if (videoElement) {
    const handleLoadedmetadata = () => {
      setAspectRatio({
        x: videoElement.videoWidth,
        y: videoElement.videoHeight,
      });

      videoElement.removeEventListener('loadedmetadata', handleLoadedmetadata);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedmetadata);
  }
}

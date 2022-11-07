import React from 'react';

import ExternalLink from '../components/ExternalLink';

export interface Props {
  readonly className?: string;
  readonly url: string;
}

export default function AudioPlayer(props: Props) {
  return (
    <audio
      className={props.className}
      controls
      preload="metadata"
      src={props.url}
    >
      <Fallback url={props.url} />
    </audio>
  );
}

interface FallbackProps {
  readonly url: string;
}

function Fallback(props: FallbackProps) {
  return (
    <p>
      Your browser does not support the HTML5 <code>audio</code> element.{' '}
      <ExternalLink download href={props.url}>
        Click here to download this audio
      </ExternalLink>
      .
    </p>
  );
}

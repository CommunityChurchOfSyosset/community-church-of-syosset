import React from 'react';

export interface Props {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly download?: boolean;
  readonly href: string;
}

export default function ExternalLink(props: Props) {
  return (
    <a
      className={props.className}
      download={props.download}
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
}

import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  margin-bottom: 0;
  text-align: center;
`;

export interface Props {
  readonly currentYear: number;
  readonly className?: string;
  readonly holder: string;
  readonly initialYear: number;
}

export default function CopyrightNotice(props: Props) {
  return (
    <Paragraph className={props.className}>
      <small>
        © {props.holder}{' '}
        <time dateTime={props.initialYear.toString()}>{props.initialYear}</time>
        {props.currentYear > props.initialYear && (
          <>
            –
            <time dateTime={props.currentYear.toString()}>
              {props.currentYear}
            </time>
          </>
        )}
      </small>
    </Paragraph>
  );
}

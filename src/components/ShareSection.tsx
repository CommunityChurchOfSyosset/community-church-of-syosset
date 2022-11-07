import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import ExternalLink from './ExternalLink';
import { baseline, color } from '../style';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.25em;
`;

const UnorderedList = styled.ul`
  list-style: none;
  margin-bottom: calc(6 * ${baseline});
  padding-left: 0;
`;

let locationHref: string | undefined;

if (typeof window !== 'undefined') {
  locationHref = window.location.href;
}

export interface Props {
  readonly contentType: string;
}

export default function ShareSection(props: Props) {
  if (locationHref) {
    return (
      <section>
        <h2>Share this {props.contentType}</h2>
        <UnorderedList>
          <li>
            <StyledFontAwesomeIcon
              color={color.facebook.blue}
              icon={['fab', 'facebook-square']}
            />
            <ExternalLink
              href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURI(
                locationHref
              )}&display=popup`}
            >
              Facebook
            </ExternalLink>
          </li>
          <li>
            <StyledFontAwesomeIcon
              color={color.twitter.blue}
              icon={['fab', 'twitter-square']}
            />
            <ExternalLink
              href={`https://twitter.com/intent/tweet?text=${encodeURI(
                document.title
              )}&url=${encodeURI(locationHref)}`}
            >
              Twitter
            </ExternalLink>
          </li>
        </UnorderedList>
      </section>
    );
  }

  return null;
}

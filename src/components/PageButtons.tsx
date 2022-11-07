import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import LinkButton from './LinkButton';

const Container = styled.div`
  display: flex;
`;

const NextIconContainer = styled.div`
  margin-left: 0.5em;
`;

const NextLinkButton = styled(LinkButton)`
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

const PrevIconContainer = styled.div`
  margin-right: 0.5em;
`;

const PrevLinkButton = styled(LinkButton)`
  display: flex;
  justify-content: center;
  margin-right: auto;
`;

export interface Props {
  readonly className?: string;
  readonly nextSlug?: string;
  readonly prevSlug?: string;
  readonly rootSlug: string;
}

export default function PageButtons(props: Props) {
  return (
    <Container className={props.className}>
      {props.prevSlug && (
        <PrevLinkButton to={`/${props.rootSlug}/${props.prevSlug}`}>
          <PrevIconContainer>
            <FontAwesomeIcon icon="chevron-left" />
            <FontAwesomeIcon icon="chevron-left" />
          </PrevIconContainer>
          Prev
        </PrevLinkButton>
      )}
      {props.nextSlug && (
        <NextLinkButton to={`/${props.rootSlug}/${props.nextSlug}`}>
          Next
          <NextIconContainer>
            <FontAwesomeIcon icon="chevron-right" />
            <FontAwesomeIcon icon="chevron-right" />
          </NextIconContainer>
        </NextLinkButton>
      )}
    </Container>
  );
}

import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import ExternalLink, { Props as ExternalLinkProps } from './ExternalLink';
import FixedImage, { Props as FixedImageProps } from './FixedImage';
import { baseline } from '../style';

const Name = styled.p`
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
  display: block;
  padding: calc(3 * ${baseline});

  &:hover {
    text-decoration: none;
  }
`;

const StyledFixedImage = styled(FixedImage)`
  height: calc(68 * ${baseline});
  width: calc(68 * ${baseline});
`;

export interface Props {
  readonly className?: string;
  readonly image: OrganizationCardContentProps['image'];
  readonly name: OrganizationCardContentProps['name'];
  readonly url?: ExternalLinkProps['href'];
}

export default function OrganizationCard(props: Props) {
  const content = props.url ? (
    <StyledExternalLink href={props.url}>
      <OrganizationCardContent image={props.image} name={props.name} />
    </StyledExternalLink>
  ) : (
    <OrganizationCardContent image={props.image} name={props.name} />
  );

  return <Card className={props.className}>{content}</Card>;
}

interface OrganizationCardContentProps {
  readonly image: FixedImageProps['image'];
  readonly name: string;
}

function OrganizationCardContent(props: OrganizationCardContentProps) {
  return (
    <>
      <StyledFixedImage
        image={props.image}
        placeholderIcon="hands-helping"
        placeholderIconSize={`calc(50 * ${baseline})`}
      />
      <Name>{props.name}</Name>
    </>
  );
}

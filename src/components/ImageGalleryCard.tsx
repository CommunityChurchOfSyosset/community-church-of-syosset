import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import FixedImage, { Props as FixedImageProps } from './FixedImage';
import { baseline } from '../style';

const Details = styled.p`
  margin-bottom: 0;
`;

const StyledFixedImage = styled(FixedImage)`
  height: calc(68 * ${baseline});
  margin-bottom: calc(3 * ${baseline});
  width: calc(68 * ${baseline});
`;

const StyledLink = styled(Link)`
  color: inherit;
  display: block;
  padding: calc(3 * ${baseline});

  &:hover {
    text-decoration: none;
  }
`;

export interface Props {
  readonly className?: string;
  readonly image: FixedImageProps['image'];
  readonly slug: string;
  readonly title: string;
}

export default function ImageGalleryCard(props: Props) {
  return (
    <Card className={props.className}>
      <StyledLink to={`/images/${props.slug}`}>
        <StyledFixedImage
          image={props.image}
          imageWrapperStyle={{ display: 'block' }}
          placeholderIcon="images"
          placeholderIconSize={`calc(54 * ${baseline})`}
        />
        <Details>
          <b>{props.title}</b>
        </Details>
      </StyledLink>
    </Card>
  );
}

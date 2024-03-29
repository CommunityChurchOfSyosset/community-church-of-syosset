import React from 'react';
import styled from 'styled-components';

import ImageGalleryCard, {
  Props as ImageGalleryCardProps,
} from './ImageGalleryCard';
import { baseline, breakpoint, color } from '../style';

const StyledImageGalleryCard = styled(ImageGalleryCard)`
  box-shadow: 0 0 5px ${color.black};
`;

const UnorderedList = styled.ul`
  display: grid;
  gap: calc(6 * ${baseline});
  grid-template-columns: calc(74 * ${baseline});
  list-style: none;
  max-width: min-content;
  padding-left: 0;

  @media (min-width: ${breakpoint.md}) {
    grid-template-columns: repeat(2, calc(74 * ${baseline}));
  }

  @media (min-width: ${breakpoint.lg}) {
    grid-template-columns: repeat(3, calc(74 * ${baseline}));
  }
`;

interface ImageGallery {
  readonly id: string;
  readonly images: ImageGalleryCardProps['image'][];
  readonly slug: string;
  readonly title: string;
}

export interface Props {
  readonly className?: string;
  readonly imageGalleries: ImageGallery[];
}

export default function ImageGalleryCardList(props: Props) {
  const imageGalleryCards = props.imageGalleries.map(imageGallery => (
    <li key={imageGallery.id}>
      <StyledImageGalleryCard
        image={imageGallery.images[0]}
        slug={imageGallery.slug}
        title={imageGallery.title}
      />
    </li>
  ));

  return (
    <UnorderedList className={props.className}>
      {imageGalleryCards}
    </UnorderedList>
  );
}

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

import ImagePlaceholderIcon from './ImagePlaceholderIcon';
import { baseline } from '../style';

const StyledGatsbyImage = styled(GatsbyImage)`
  border-radius: ${baseline};
`;

interface Image {
  readonly description: string;
  readonly gatsbyImageData: IGatsbyImageData;
}

export interface Props {
  readonly className?: string;
  readonly image?: Image;
  readonly imageWrapperStyle?: object;
  readonly placeholderIcon: IconProp;
  readonly placeholderIconSize: string;
}

export default function FixedImage(props: Props) {
  if (props.image) {
    return (
      <StyledGatsbyImage
        alt={props.image.description}
        className={props.className}
        image={props.image.gatsbyImageData}
        style={{ ...props.imageWrapperStyle }}
      />
    );
  }

  return (
    <ImagePlaceholderIcon
      className={props.className}
      icon={props.placeholderIcon}
      iconSize={props.placeholderIconSize}
    />
  );
}

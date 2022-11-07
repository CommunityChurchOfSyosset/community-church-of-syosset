import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import FixedImage, { Props as FixedImageProps } from './FixedImage';
import { baseline, typography } from '../style';

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
};

const DateAndTime = styled.p`
  margin-bottom: 0;
`;

const StyledFixedImage = styled(FixedImage)`
  flex-shrink: 0;
  height: calc(18 * ${baseline});
  margin-right: calc(3 * ${baseline});
  width: calc(18 * ${baseline});
`;

const StyledLink = styled(Link)`
  color: inherit;
  display: flex;
  padding: calc(3 * ${baseline});

  &:hover {
    text-decoration: none;
  }
`;

const Title = styled.p`
  font-family: ${typography.font.heading};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0;
`;

export interface Props {
  readonly className?: string;
  readonly date: string;
  readonly image: FixedImageProps['image'];
  readonly slug: string;
  readonly title: string;
}

export default function EventCard(props: Props) {
  const dateObject = new Date(props.date);

  const dateString = dateObject.toLocaleDateString(
    undefined,
    DATE_FORMAT_OPTIONS
  );

  const timeString = dateObject.toLocaleTimeString(
    undefined,
    TIME_FORMAT_OPTIONS
  );

  return (
    <Card className={props.className}>
      <StyledLink to={`/events/${props.slug}`}>
        <StyledFixedImage
          image={props.image}
          imageWrapperStyle={{ display: 'block' }}
          placeholderIcon={['far', 'calendar']}
          placeholderIconSize={`calc(12 * ${baseline})`}
        />
        <div>
          <Title>{props.title}</Title>
          <DateAndTime>
            <time dateTime={props.date}>
              {dateString} <br />
              {timeString}
            </time>
          </DateAndTime>
        </div>
      </StyledLink>
    </Card>
  );
}

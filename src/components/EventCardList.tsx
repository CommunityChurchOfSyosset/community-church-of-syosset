import React from 'react';
import styled from 'styled-components';

import EventCard, { Props as EventCardProps } from '../components/EventCard';
import { baseline, breakpoint, color } from '../style';

const ListItem = styled.li`
  margin-bottom: calc(6 * ${baseline});

  @media (min-width: ${breakpoint.md}) {
    margin-bottom: 0;
  }
`;

const StyledEventCard = styled(EventCard)`
  box-shadow: 0 0 5px ${color.black};
`;

const UnorderedList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

interface Event {
  readonly date: string;
  readonly id: string;
  readonly image: EventCardProps['image'];
  readonly slug: string;
  readonly title: string;
}

export interface Props {
  readonly className?: string;
  readonly events: Event[];
}

export default function EventCardList(props: Props) {
  const eventCards = props.events.map(event => (
    <ListItem key={event.id}>
      <StyledEventCard
        date={event.date}
        image={event.image}
        slug={event.slug}
        title={event.title}
      />
    </ListItem>
  ));

  return (
    <UnorderedList className={props.className}>{eventCards}</UnorderedList>
  );
}

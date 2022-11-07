import React from 'react';
import styled from 'styled-components';
import ServiceCard, { Props as ServiceCardProps } from './ServiceCard';
import { baseline, color } from '../style';

const ListItem = styled.li`
  margin-bottom: calc(6 * ${baseline});
`;

const StyledServiceCard = styled(ServiceCard)`
  box-shadow: 0 0 5px ${color.black};
`;

const UnorderedList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

interface Service {
  readonly date: ServiceCardProps['date'];
  readonly id: string;
  readonly image: ServiceCardProps['image'];
  readonly preacher: ServiceCardProps['preacher'];
  readonly slug: ServiceCardProps['slug'];
  readonly title: ServiceCardProps['title'];
}

export interface Props {
  readonly className?: string;
  readonly services: readonly Service[];
}

export default function ServiceCardList(props: Props) {
  const serviceCards = props.services.map(service => (
    <ListItem key={service.id}>
      <StyledServiceCard
        date={service.date}
        image={service.image}
        preacher={service.preacher}
        slug={service.slug}
        title={service.title}
      />
    </ListItem>
  ));

  return (
    <UnorderedList className={props.className}>{serviceCards}</UnorderedList>
  );
}

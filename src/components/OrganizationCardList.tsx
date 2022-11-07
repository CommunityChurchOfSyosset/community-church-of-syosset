import React from 'react';
import styled from 'styled-components';

import OrganizationCard, {
  Props as OrganizationCardProps,
} from './OrganizationCard';
import { baseline, breakpoint, color } from '../style';

const StyledOrganizationCard = styled(OrganizationCard)`
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

interface Organization extends OrganizationCardProps {
  readonly id: string;
}

export interface Props {
  readonly className?: string;
  readonly organizations: readonly Organization[];
}

export default function OrganizationCardList(props: Props) {
  const organizationCards = props.organizations.map(organization => (
    <li key={organization.id}>
      <StyledOrganizationCard
        image={organization.image}
        name={organization.name}
        url={organization.url}
      />
    </li>
  ));

  return (
    <UnorderedList className={props.className}>
      {organizationCards}
    </UnorderedList>
  );
}

import React from 'react';
import styled from 'styled-components';

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 0;
`;

export interface Props {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly title: string;
  readonly type: 'ordered' | 'unordered';
}

export default function TitledList(props: Props) {
  const List = getListTag(props.type);

  const listItems = React.Children.map(props.children, (child, index) => (
    <li key={index}>{child}</li>
  ));

  return (
    <div className={props.className}>
      <Title>{props.title}</Title>
      <List>{listItems}</List>
    </div>
  );
}

function getListTag(type: 'ordered' | 'unordered') {
  switch (type) {
    case 'ordered':
      return 'ol';
    case 'unordered':
      return 'ul';
    default:
      throw new Error(
        `getListTag function received invalid argument for type parameter: ${type}`
      );
  }
}

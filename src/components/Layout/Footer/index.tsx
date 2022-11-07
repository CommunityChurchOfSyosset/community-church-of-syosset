import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CopyrightNotice, {
  Props as CopyrightNoticeProps,
} from './CopyrightNotice';
import ExternalLink from '../../ExternalLink';
import TitledList from '../../TitledList';
import { baseline, breakpoint, color } from '../../../style';

const Grid = styled.div`
  @media (min-width: ${breakpoint.md}) {
    column-gap: calc(6 * ${baseline});
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledFooter = styled.footer`
  background-color: ${color.darkGray};
  color: ${color.white};
  padding: calc(6 * ${baseline}) calc(3 * ${baseline}) 0;

  a {
    color: ${color.secondary};
    transition: filter 500ms;

    &:focus {
      filter: drop-shadow(0 0 5px ${color.white});
    }

    &:active {
      color: ${color.primary};
    }
  }
`;

const StyledExternalLink = styled(ExternalLink)`
  color: ${color.secondary};
`;

const StyledTitledList = styled(TitledList)`
  margin-bottom: calc(6 * ${baseline});

  ul {
    list-style: none;
    padding-left: 0;
  }
`;

export interface Props {
  readonly className?: string;
  readonly copyright: {
    readonly holder: CopyrightNoticeProps['holder'];
    readonly initialYear: CopyrightNoticeProps['initialYear'];
  };
  readonly organization: {
    readonly address: {
      readonly city: string;
      readonly state: string;
      readonly street: string;
      readonly zip: string;
    };
    readonly name: string;
    readonly phone: string;
  };
  readonly socialMedia: {
    readonly facebook: {
      readonly slug: string;
    };
  };
}

export default function Footer(props: Props) {
  const phoneString = props.organization.phone.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '($1)$2-$3'
  );

  return (
    <StyledFooter className={props.className}>
      <Grid>
        <address>
          <p>
            <b>{props.organization.name}</b> <br />
            {props.organization.address.street} <br />
            {props.organization.address.city},{' '}
            {props.organization.address.state} {props.organization.address.zip}{' '}
            <br />
            <FontAwesomeIcon icon="phone" />{' '}
            <a href={`tel:+1${props.organization.phone}`}>{phoneString}</a>
          </p>
        </address>
        <StyledTitledList title="Social media" type="unordered">
          <>
            <FontAwesomeIcon icon={['fab', 'facebook-square']} />{' '}
            <StyledExternalLink
              href={`https://www.facebook.com/${props.socialMedia.facebook.slug}/`}
            >
              Facebook
            </StyledExternalLink>
          </>
        </StyledTitledList>
        <StyledTitledList title="United Church of Christ" type="unordered">
          <StyledExternalLink href="https://www.ucc.org/">
            Global
          </StyledExternalLink>
          <StyledExternalLink href="http://www.uccny.org/">
            New York Conference
          </StyledExternalLink>
        </StyledTitledList>
      </Grid>
      <CopyrightNotice
        currentYear={new Date().getFullYear()}
        holder={props.copyright.holder}
        initialYear={props.copyright.initialYear}
      />
    </StyledFooter>
  );
}

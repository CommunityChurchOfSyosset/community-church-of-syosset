import { Link, navigate } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';
import FormControl from './FormControl';
import LinkButton from './LinkButton';
import { baseline, typography, color } from '../style';

const Container = styled.div`
  font-family: ${typography.font.heading};
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
`;

const EllipsisContainer = styled.div`
  display: inline-block;
  margin: 0 calc(0.5 * ${baseline});
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: flex-end;
`;

const GoIconContainer = styled.div`
  margin-left: 0.5em;
`;

const PageNumbersContainer = styled.div`
  margin: 0 auto calc(6 * ${baseline});
  width: max-content;
`;

const StyledButton = styled(Button)`
  display: flex;
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
  padding: 0 calc(1 * ${baseline});
`;

const StyledFormControl = styled(FormControl)`
  align-items: center;
  flex-direction: row;
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
  margin-right: 0.5em;

  input {
    padding: 0 calc(1 * ${baseline});
  }

  label {
    font-size: ${typography.fontSize.body.xs};
    line-height: ${typography.lineHeight.body.xs};
    margin: 0 0.5em 0 0;
  }
`;

const StyledLinkButton = styled(LinkButton)`
  display: inline-block;
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
  margin: 0 calc(0.5 * ${baseline});
  min-width: 3ch;
  padding: 0 calc(1 * ${baseline});

  &.active {
    background-color: ${color.secondary};
    color: ${color.body};
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export interface Props {
  readonly className?: string;
  readonly lastPageNumber: number;
  readonly pageNumber: number;
  readonly urlRoot: string;
}

export default function Pagination(props: Props) {
  const [selectedPageNumber, setSelectedPageNumber] = useState('');
  const pageUrl = `/${props.urlRoot}/page`;

  return (
    <Container className={props.className}>
      <PageNumbersContainer>
        {props.pageNumber > 1 && (
          <>
            <StyledLinkButton to={`${pageUrl}/${props.pageNumber - 1}`}>
              <FontAwesomeIcon icon="chevron-left" />
            </StyledLinkButton>
            <StyledLinkButton to={`${pageUrl}/1`}>1</StyledLinkButton>
          </>
        )}
        {props.pageNumber - 3 > 1 && <EllipsisContainer>…</EllipsisContainer>}
        {props.pageNumber - 2 > 1 && (
          <StyledLinkButton to={`${pageUrl}/${props.pageNumber - 2}`}>
            {props.pageNumber - 2}
          </StyledLinkButton>
        )}
        {props.pageNumber - 1 > 1 && (
          <StyledLinkButton to={`${pageUrl}/${props.pageNumber - 1}`}>
            {props.pageNumber - 1}
          </StyledLinkButton>
        )}
        <StyledLinkButton
          className="active"
          to={`${pageUrl}/${props.pageNumber}`}
        >
          {props.pageNumber}
        </StyledLinkButton>
        {props.pageNumber + 1 < props.lastPageNumber && (
          <StyledLinkButton to={`${pageUrl}/${props.pageNumber + 1}`}>
            {props.pageNumber + 1}
          </StyledLinkButton>
        )}
        {props.pageNumber + 2 < props.lastPageNumber && (
          <StyledLinkButton to={`${pageUrl}/${props.pageNumber + 2}`}>
            {props.pageNumber + 2}
          </StyledLinkButton>
        )}
        {props.pageNumber + 3 < props.lastPageNumber && (
          <EllipsisContainer>…</EllipsisContainer>
        )}
        {props.pageNumber < props.lastPageNumber && (
          <>
            <StyledLinkButton to={`${pageUrl}/${props.lastPageNumber}`}>
              {props.lastPageNumber}
            </StyledLinkButton>
            <StyledLinkButton to={`${pageUrl}/${props.pageNumber + 1}`}>
              <FontAwesomeIcon icon="chevron-right" />
            </StyledLinkButton>
          </>
        )}
      </PageNumbersContainer>
      {props.lastPageNumber > 4 && (
        <Form
          onSubmit={event =>
            handleSubmit(event, props.urlRoot, selectedPageNumber)
          }
        >
          <StyledFormControl
            label="Go to page"
            max={props.lastPageNumber}
            min={1}
            name="go-to-page"
            onChange={event => handleChange(event, setSelectedPageNumber)}
            required
            type="number"
            value={selectedPageNumber}
          />
          <StyledButton>
            Go
            <GoIconContainer>
              <FontAwesomeIcon icon="chevron-right" />
              <FontAwesomeIcon icon="chevron-right" />
            </GoIconContainer>
          </StyledButton>
        </Form>
      )}
    </Container>
  );
}

function handleChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) {
  event.preventDefault();
  setState(event.target.value);
}

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  slug: string,
  pageNumber: string
) {
  event.preventDefault();
  navigate(`/${slug}/page/${pageNumber}`);
}

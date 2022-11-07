import React from 'react';
import styled from 'styled-components';

import { baseline, color, typography } from '../style';

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: 1px solid ${color.lightGray};
  border-radius: ${baseline};
  font-family: ${typography.font.body};
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
  padding: calc(2 * ${baseline} - 1px);
  transition: filter 500ms;

  &:focus {
    filter: drop-shadow(0 0 5px ${color.primary});
  }
`;

const Label = styled.label`
  display: flex;
  font-family: ${typography.font.heading};
  font-size: ${typography.fontSize.h4.xs};
  justify-content: space-between;
  line-height: ${typography.lineHeight.h4.xs};
  margin-bottom: calc(2 * ${baseline});
`;

const Textarea = styled.textarea`
  border: 1px solid ${color.lightGray};
  border-radius: ${baseline};
  font-family: ${typography.font.body};
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
  padding: calc(2 * ${baseline} - 1px);
  transition: filter 500ms;

  &:focus {
    filter: drop-shadow(0 0 5px ${color.primary});
  }
`;

const StyledOptionalNotice = styled(OptionalNotice)`
  font-family: ${typography.font.body};
  font-size: ${typography.fontSize.body.xs};
  line-height: ${typography.lineHeight.body.xs};
`;

export interface Props {
  readonly className?: string;
  readonly label: string;
  readonly max?: number;
  readonly min?: number;
  readonly name: string;
  readonly onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly pattern?: string;
  readonly required?: boolean;
  readonly type: string;
  readonly value?: string;
}

export default function FormControl(props: Props) {
  const control =
    props.type === 'textarea' ? (
      <Textarea
        id={props.name}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
        spellCheck
        value={props.value}
      />
    ) : (
      <Input
        id={props.name}
        max={props.max}
        min={props.min}
        name={props.name}
        onChange={props.onChange}
        pattern={props.pattern}
        required={props.required}
        type={props.type}
        value={props.value}
      />
    );

  return (
    <Div className={props.className}>
      <Label htmlFor={props.name}>
        {props.label}
        {props.required || <StyledOptionalNotice />}
      </Label>
      {control}
    </Div>
  );
}

interface OptionalNoticeProps {
  readonly className?: string;
}

function OptionalNotice(props: OptionalNoticeProps) {
  return <i className={props.className}>* optional</i>;
}

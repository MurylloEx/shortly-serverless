import React, { FunctionComponent } from 'react';
import { Styled } from './styles';

export enum InputButtonType {
  PRIMARY = 'primary',
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info'
}

export interface InputProps {
  type: InputButtonType;
  value: string;
  placeholder: string;
  buttonName: string;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: FunctionComponent<InputProps> = ({
  type,
  value,
  placeholder,
  buttonName,
  inputDisabled,
  buttonDisabled,
  onClick,
  onChange,
}) => {
  return (
    <Styled.InputGroup className="input-group">
      <Styled.Input 
        value={value}
        className="form-control" 
        placeholder={placeholder} 
        disabled={inputDisabled} 
        onChange={onChange}
      />
      <Styled.InputGroupAppend className="input-group-append">
        <Styled.Button 
          type="button" 
          className={`btn btn-${type}`} 
          onClick={onClick}
          disabled={buttonDisabled}
        >
          {buttonName}
        </Styled.Button>
      </Styled.InputGroupAppend>
    </Styled.InputGroup>
  );
}

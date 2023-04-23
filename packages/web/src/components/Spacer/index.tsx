import { FunctionComponent } from 'react';
import { Styled } from './styles';

export interface SpacerProps {
  value: string;
}

export const Spacer: FunctionComponent<SpacerProps> = ({ value }) => {
  return (
    <Styled.Container value={value} />
  );
}

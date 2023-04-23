import { Fragment, FunctionComponent } from 'react';
import { Styled } from './styles';

export interface FooterProps {
  
}

export const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <Styled.Container>
      © 2023 
      <Styled.Strong>
        Shortly: O encurtador mais funcional de todos
      </Styled.Strong>
    </Styled.Container>
  );
}

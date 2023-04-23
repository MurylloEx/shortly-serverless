import { FunctionComponent } from 'react';
import { Styled } from './styles';

export const Header: FunctionComponent = () => {
  return (
    <Styled.Row>
      <Styled.Image 
        src="/logo.png" 
        title="Shortly" 
        alt="Shortly"
      />
    </Styled.Row>
  );
}

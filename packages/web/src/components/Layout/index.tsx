import { FunctionComponent, PropsWithChildren } from 'react';
import { Styled } from './styles';

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Styled.Container>
      {children}
    </Styled.Container>
  );
}

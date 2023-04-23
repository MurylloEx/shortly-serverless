import { FunctionComponent } from 'react';
import { Styled, ToastColors } from './styles';

export enum ToastType {
  INFO = 'INFO',
  DANGER = 'DANGER',
  SUCCESS = 'SUCCESS'
}

export interface ToastProps {
  children: string;
  type: ToastType;
}

const Colors: Record<ToastType, ToastColors> = {
  [ToastType.INFO]: {
    foreground: '#004085',
    background: '#cce5ff',
    border: '#b8daff'
  },
  [ToastType.DANGER]: {
    foreground: '#721c24',
    background: '#f8d7da',
    border: '#f5c6cb'
  },
  [ToastType.SUCCESS]: {
    foreground: '#155724',
    background: '#d4edda',
    border: '#c3e6cb'
  },
}

export const Toast: FunctionComponent<ToastProps> = ({ children, type }) => {
  return (
    <Styled.Container colors={Colors[type]}>
      <Styled.Paragraph colors={Colors[type]}>
        {children}
      </Styled.Paragraph>
    </Styled.Container>
  );
}

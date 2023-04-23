import styled from 'styled-components';

export interface ToastColors {
  background: string;
  foreground: string;
  border: string;
}

export interface ElementWithColors {
  colors: ToastColors;
}

const Container = styled.div.attrs<ElementWithColors>(props => props)<ElementWithColors>`
  border: 1px solid ${props => props.colors.border};
  background-color: ${props => props.colors.background};
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
`;

const Paragraph = styled.p.attrs<ElementWithColors>(props => props)<ElementWithColors>`
  margin: 0;
  font-size: 18px;
  color: ${props => props.colors.foreground};
  text-align: center;
`;

export const Styled = {
  Container,
  Paragraph
};

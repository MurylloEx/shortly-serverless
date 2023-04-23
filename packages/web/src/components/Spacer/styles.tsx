import styled from 'styled-components';

export interface ContainerProps {
  value: string;
}

const Container = styled.div.attrs<ContainerProps>(props => props)<ContainerProps>`
  width: 100%;
  height: ${props => props.value};
`;

export const Styled = {
  Container
};

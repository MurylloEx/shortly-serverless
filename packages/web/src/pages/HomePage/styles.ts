import styled from 'styled-components';

const Title = styled.h2`
  margin: 1.5rem 0 1.5rem 0;
  font-size: 28px;
  text-align: center;
`;

const Paragraph = styled.p`
  color: #646464;
  font-size: medium;
  text-align: justify;
`;

const Link = styled.a`
  & {
    color: #007bff;
    text-decoration: none;
  }
  &:hover {
    color: #007bcf;
    text-decoration: none;
  }
  &::after, &::before {
    content: ' ';
  }
`;

export const Styled = {
  Title,
  Link,
  Paragraph,
};

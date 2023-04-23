import styled from 'styled-components';

const Image = styled.img`
  vertical-align: middle;
  border-style: none;
  width: 150px;
  height: 150px;
`;

const Title = styled.p`
  margin-top: 2rem;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
`;

const Description = styled.p`
  color: #646464;
  font-size: small;
  text-align: justify;
`;

const Row = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem 2rem 2rem;
`;

export const Styled = {
  Image,
  Title,
  Description,
  Row,
  Column
};

import { FunctionComponent } from 'react';
import { Styled } from './styles';

export const Benefits: FunctionComponent = () => {
  return (
    <Styled.Row>
      <Styled.Column>
        <Styled.Image src="/benefit_1.png" title="Fácil e intuitivo" />
        <Styled.Title>Fácil e intuitivo</Styled.Title>
        <Styled.Description>
          Domínio fácil e intuitivo de se memorizar e usar, 
          tornando os seus links encurtados mais amigáveis 
          para se compartilhar e facilitando o engajamento 
          da sua audiência.
        </Styled.Description>
      </Styled.Column>
      <Styled.Column>
        <Styled.Image src="/benefit_2.png" title="Links seguros" />
        <Styled.Title>Links seguros</Styled.Title>
        <Styled.Description>
          Todas as suas URLs encurtadas são criptografas 
          por padrão, tornandos as mais seguras através 
          de certificados de segurança (HTTPS) consolidados 
          no mercado.
        </Styled.Description>
      </Styled.Column>
      <Styled.Column>
        <Styled.Image src="/benefit_3.png" title="Feito para simplificar" />
        <Styled.Title>Feito para simplificar</Styled.Title>
        <Styled.Description>
          Tendo como objetivo principal encurtar links, nós 
          focamos na melhor experiência possível para que 
          você consiga encurtá-los da maneira mais simples 
          e rápida possível.
        </Styled.Description>
      </Styled.Column>
    </Styled.Row>
  );
}

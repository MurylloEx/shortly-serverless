import {
  Header,
  Layout,
  Toast,
  ToastType,
  Spacer,
  Container,
  Benefits,
  Footer,
  Input,
  InputButtonType,
  If
} from 'src/components';

import { Styled } from './styles';
import { useViewShortenUrl, useUrlAnalyzer, ApiClient } from 'src/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, FunctionComponent, useEffect, useState } from 'react';

export const ViewerPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const {code} = useParams();
  const {getCode, hasFoundCode} = useUrlAnalyzer();
  const [shortenUrl, setShortenUrl] = useState<string>('https://shortly.com.br/code/aMkx61');
  const [accessCount, setAccessCount] = useState<number>(0);
  const [shortenUrlToView, setShortenUrlToView] = useState<string>('');
  
  const [toast, setToast] = useState({
    show: false,
    type: ToastType.INFO,
    message: ''
  });

  const {
    view,
    result,
    isSuccess,
    isDone,
    isLoading
  } = useViewShortenUrl();

  useEffect(() => {
    view(code!);
  }, [code]);

  useEffect(() => {
    if (isLoading) {
      setToast({
        show: false,
        type: ToastType.INFO,
        message: ''
      });
    }
    if (isSuccess && isDone) {
      setShortenUrl(ApiClient.getUri() + '/v1/code/' + result?.shortCode);
      setAccessCount(result?.accessCount ?? 0);
    }
    if (!isSuccess && isDone) {
      setToast({
        show: true,
        type: ToastType.DANGER,
        message: 'A URL encurtada fornecida não foi encontrada, tente novamente.'
      });
    }
  }, [isSuccess, isDone, isLoading]);



  return (
    <Fragment>
      <Header />

      <Layout>
        <If value={toast.show}>
          <If.Then>
            <Toast type={toast.type}>
              {toast.message}
            </Toast>
          </If.Then>
        </If>

        <Spacer value={'16px'} />

        <Container>
          <Styled.Title>
            Quantidade de cliques recebidos:
          </Styled.Title>

          <If value={isSuccess && isDone}>
            <If.Then>
              <Styled.Counter>{accessCount}</Styled.Counter>
            </If.Then>

            <If.ElseIf value={isDone && !isSuccess}>
              <Styled.Counter>-</Styled.Counter>
            </If.ElseIf>

            <If.ElseIf value={isLoading}>
              <Styled.Counter>Carregando...</Styled.Counter>
            </If.ElseIf>
          </If>

          <Spacer value={'16px'} />

          <If value={isSuccess && isDone}>
            <If.Then>
              <Styled.Paragraph>
                Você está visualizando as estatísticas de acessos da URL: <b>{shortenUrl}</b>
              </Styled.Paragraph>
            </If.Then>
          </If>

          <Styled.Paragraph>
            Para visualizar as estatísticas de acessos de outras URLs encurtadas pelo 
            Shortly, cole-as no campo abaixo e veja quantos acessos essa URL recebeu. 
            Note que a quantidade de acessos se dá pelo número de cliques, não pelo 
            número de visualizações únicas.
          </Styled.Paragraph>

          <Spacer value={'16px'} />

          <Input
            value={shortenUrlToView}
            type={InputButtonType.PRIMARY} 
            buttonName={'Visualizar acessos'} 
            placeholder={'URL Encurtada'}
            onChange={(event) => setShortenUrlToView(event.target.value)}
            onClick={() => navigate('/view/' + getCode(shortenUrlToView))}
            inputDisabled={isLoading}
            buttonDisabled={isLoading || !hasFoundCode(shortenUrlToView)}
          />
        </Container>

        <Spacer value={'16px'} />

        <Benefits />
      </Layout>

      <Footer />
    </Fragment>
  );
}

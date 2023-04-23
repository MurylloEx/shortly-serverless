import { Styled } from './styles';
import { ApiClient, useShorten, useUrlAnalyzer } from 'src/hooks';
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  Benefits,
  Footer,
  Header,
  Toast,
  Layout,
  ToastType,
  Container,
  Spacer,
  Input,
  InputButtonType,
  If
} from 'src/components';

enum HomePageView {
  BEFORE_TYPE_URL = 1,
  AFTER_TYPE_URL = 2,
}

export const HomePage: FunctionComponent = () => {
  const [currentView, setCurrentView] = useState<HomePageView>(HomePageView.BEFORE_TYPE_URL);
  const [shortenUrl, setShortenUrl] = useState<string>('');
  const [realUrl, setRealUrl] = useState<string>('');
  
  const [toast, setToast] = useState({
    show: false,
    type: ToastType.INFO,
    message: ''
  });
  
  const {validate} = useUrlAnalyzer();
  const {
    create,
    result,
    isSuccess,
    isDone,
    isLoading
  } = useShorten();

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
      setCurrentView(HomePageView.AFTER_TYPE_URL);

      setToast({
        show: true,
        type: ToastType.INFO,
        message: 'Clique no botão copiar para utilizar a URL encurtada.'
      });
    }
    if (!isSuccess && isDone) {
      setToast({
        show: true,
        type: ToastType.DANGER,
        message: 'Não foi possível encurtar a URL fornecida, verifique se a URL é válida e tente novamente.'
      });
    }
  }, [isSuccess, isDone, isLoading]);

  const onClickShortenUrl = useCallback(() => {
    setToast({
      show: false,
      type: ToastType.INFO,
      message: ''
    });
    create(realUrl);
  }, [setToast, create, realUrl]);

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
          <If value={currentView === HomePageView.BEFORE_TYPE_URL}>
            <If.Then>
              <Styled.Title>
                Forneça a URL a ser encurtada 🔗
              </Styled.Title>

              <Spacer value={'16px'} />

              <Input
                value={realUrl}
                type={InputButtonType.INFO} 
                buttonName={'Encurtar'} 
                placeholder={'URL a ser encurtada'}
                inputDisabled={isLoading}
                buttonDisabled={!validate(realUrl) || isLoading}
                onChange={(event) => setRealUrl(event.target.value)}
                onClick={onClickShortenUrl}
              />

              <Spacer value={'16px'} />
              
              <Styled.Paragraph>
                Forneça URLs grandes e não amigáveis para que o Shortly 
                possa encurtá-las em URLs pequenas e memoráveis. Observe 
                que não há limites para o tamanho da URL a ser encurtada.
              </Styled.Paragraph>
            </If.Then>

            <If.ElseIf value={currentView === HomePageView.AFTER_TYPE_URL}>
              <Styled.Title>
                Sua URL foi encurtada ✔️
              </Styled.Title>

              <Spacer value={'16px'} />

              <Input
                value={shortenUrl}
                type={InputButtonType.SUCCESS} 
                buttonName={'Copiar'} 
                placeholder={'Sua URL encurtada'}
                onClick={() => navigator.clipboard.writeText(shortenUrl)}
                inputDisabled
              />

              <Spacer value={'16px'} />

              <Styled.Paragraph>
                O Encurtador de URL permite diminuir um link longo 
                tornando-o fácil de lembrar. Você também pode 
                <Styled.Link href={`/#/view/${result?.shortCode}`}>
                  visualizar as estatísticas de acesso
                </Styled.Link> 
                desta e de outras URLs encurtadas.
                <Styled.Link href="/">
                  Quero encurtar uma nova URL
                </Styled.Link>
              </Styled.Paragraph>
            </If.ElseIf>
          </If>
        </Container>

        <Spacer value={'16px'} />

        <Benefits />
      </Layout>

      <Footer />
    </Fragment>
  );
}

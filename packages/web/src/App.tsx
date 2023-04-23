import { Fragment, FunctionComponent } from 'react';
import { AppRouter } from 'src/routes';
import { ApplicationStyle } from 'src/styles';

export const App: FunctionComponent = () => (
  <Fragment>
    <AppRouter />
    <ApplicationStyle />
  </Fragment>
);

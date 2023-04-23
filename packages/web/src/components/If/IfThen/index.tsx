import React, { Fragment, PropsWithChildren } from 'react';

export const IfThen: React.FC<PropsWithChildren> = ({ children }) => (
  <Fragment>{children}</Fragment>
);

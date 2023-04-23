import React, { Fragment, PropsWithChildren } from 'react';

export interface IfElseIfProps {
  value: boolean;
}

export const IfElseIf: React.FC<PropsWithChildren<IfElseIfProps>> = ({ value, children }) => {
  return value ? <Fragment>{children}</Fragment> : null;
}

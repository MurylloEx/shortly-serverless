import { Fragment, FunctionComponent, ReactElement, useCallback } from 'react';
import { IfElse } from './IfElse';
import { IfThen } from './IfThen';
import { IfElseIf } from './IfElseIf';

type CompoundComponent<T, K> = FunctionComponent<T> & K;

type IfThenType = typeof IfThen;
type IfElseType = typeof IfElse;
type IfElseIfType = typeof IfElseIf;

type IfThenChildren = ReactElement<IfThenType>;
type IfElseChildren = ReactElement<IfElseType>;
type IfElseIfChildren = ReactElement<IfElseIfType>;
type IfElseElseIfChildren = IfElseChildren | IfElseIfChildren;

type IfThenElseChildren = [IfThenChildren, IfElseChildren];
type IfThenElseElseIfChildren = [IfThenChildren, ...IfElseElseIfChildren[]];

export type IfChildren = 
  IfThenChildren | 
  IfElseChildren |
  IfThenElseChildren | 
  IfThenElseElseIfChildren;

export interface IfCompound {
  Then: IfThenType;
  Else: IfElseType;
  ElseIf: IfElseIfType;
}

export interface IfProps {
  value: boolean;
  children: IfChildren;
}

export const If: CompoundComponent<IfProps, IfCompound> = ({ children, value }) => {

  const getFlowResult = useCallback((desiredFlow: IfThenType | IfElseType | IfElseIfType) => {
    const hasMultipleFlows = Array.isArray(children);

    if (hasMultipleFlows) {
      const [thenFlow, ...elseFlows] = children;

      if ((desiredFlow === IfThen) && (thenFlow.type === IfThen)) {
        return thenFlow;
      }

      return elseFlows.reduce((accumulator: ReactElement | null, flow: IfElseElseIfChildren) => {
        return (flow.type === desiredFlow) && !accumulator
          ? flow.type(flow.props)
          : accumulator;
      }, null);
    }

    const isSingleThenFlow = (desiredFlow === IfThen) && (children.type === IfThen);
    const isSingleElseFlow = (desiredFlow === IfElse) && (children.type === IfElse);

    return isSingleThenFlow || isSingleElseFlow ? children : <Fragment />;
  }, [children]);

  return value 
    ? getFlowResult(IfThen) 
    : getFlowResult(IfElseIf) 
    ?? getFlowResult(IfElse);
}

If.Then = IfThen;
If.Else = IfElse;
If.ElseIf = IfElseIf;

export * from './IfThen';
export * from './IfElse';
export * from './IfElseIf';

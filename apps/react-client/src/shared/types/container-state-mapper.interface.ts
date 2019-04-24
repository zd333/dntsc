import { Action as ReduxAction, AnyAction, Dispatch } from 'redux';
import { Omitted } from './omitted.type';

/**
 * Use this to type `mapStateToProps` when creating smart container component.
 */
export type StateToComponentNonFunctionPropsMapper<
  WrappedComponentProps,
  State,
  OwnProps = {}
> = (
  state: State,
  ownProps: OwnProps,
) => NonFunctionProps<WrappedComponentProps>;

/**
 * Use this to type `mapDispatchToProps` when creating smart container component.
 */
export type DispatchToComponentFunctionPropsMapper<
  WrappedComponentProps,
  Action extends ReduxAction = AnyAction,
  OwnProps = {}
> = (
  dispatch: Dispatch<Action>,
  ownProps: OwnProps,
) => FunctionProps<WrappedComponentProps>;

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
type PartialConditionalSubType<Base, Condition> = Partial<
  Pick<Base, AllowedNames<Base, Condition>>
>;
type FunctionProps<Base> = PartialConditionalSubType<
  Base,
  // Those are really any, because must be generic generic
  /* tslint:disable-next-line:no-any */
  (...args: any) => any
>;
type NonFunctionProps<Base> = Omitted<Base, keyof FunctionProps<Base>>;

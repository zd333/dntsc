import { Action as ReduxAction, AnyAction, Dispatch } from 'redux';

/**
 * Use this to type `mapStateToProps` when creating smart container component.
 */
export type StateMapper<WrappedComponentProps, State, OwnProps = {}> = (
  state: State,
  ownProps?: OwnProps,
) => Partial<WrappedComponentProps>;

/**
 * Use this to type `mapDispatchToProps` when creating smart container component.
 */
export type DispatchMapper<
  WrappedComponentProps,
  Action extends ReduxAction = AnyAction
> = (dispatch: Dispatch<Action>) => FunctionProps<WrappedComponentProps>;

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
type PartialConditionalSubType<Base, Condition> = Partial<
  Pick<Base, AllowedNames<Base, Condition>>
>;
type FunctionProps<Base> = PartialConditionalSubType<
  Base,
  (...args: any) => any
>;
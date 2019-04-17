import * as React from 'react';
import { connect, FormikContext, FormikValues } from 'formik';

/**
 * This is invisible component to handle changes with Formik forms.
 * There is implementation by Formik lib author:
 * https://github.com/jaredpalmer/formik-effect
 * but it is currently not working (since React 16.3 API changes).
 * TODO: replace with formik-effect lib when it supports modern React API.
 */

interface FormikEffectsProps<T = FormikValues> {
  readonly onChange: (params: {
    readonly currentValues: T;
    readonly nextValues: T;
  }) => void;
}

interface ConnectedFormikEffectsProps<T> extends FormikEffectsProps<T> {
  readonly formik: FormikContext<T>;
}

class ConnectedFormikEffects<T> extends React.PureComponent<
  ConnectedFormikEffectsProps<T>
> {
  public componentWillReceiveProps(
    nextProps: ConnectedFormikEffectsProps<T>,
  ): void {
    const { values: currentValues } = this.props.formik;
    const { values: nextValues } = nextProps.formik;
    if (currentValues !== nextValues) {
      this.props.onChange({ currentValues, nextValues });
    }
  }

  public render(): JSX.Element | null {
    return null;
  }
}

export const FormikEffects = connect<FormikEffectsProps>(
  ConnectedFormikEffects,
);

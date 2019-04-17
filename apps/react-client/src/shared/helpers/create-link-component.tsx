import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

/**
 * Use this helper to create ad-hoc components that can be passed to `component` prop of `MenuItem`.
 */
export const createLinkComponent = (to: string): React.FunctionComponent => (
  linkProps: LinkProps,
) => <Link to={to} {...linkProps} />;

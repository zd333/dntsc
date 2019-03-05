import { createSelector } from 'reselect';
import { selectAllItemsDict } from './all-items-dictionary.selector';

export const selectIsItemsDictEmpty = createSelector(
  [selectAllItemsDict],
  allItemsDict =>
    !allItemsDict ||
    Object.getOwnPropertyNames(allItemsDict).filter(
      propName => !!allItemsDict[propName],
    ).length === 0,
);

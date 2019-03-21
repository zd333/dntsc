import { createSelector } from 'reselect';
import { selectItemsDict } from './items-dictionary.selector';

export const selectAllItems = createSelector(
  [selectItemsDict],
  itemsDict =>
    itemsDict
      ? Object.getOwnPropertyNames(itemsDict)
          .map(propName => itemsDict[propName])
          .filter(item => !!item)
      : [],
);

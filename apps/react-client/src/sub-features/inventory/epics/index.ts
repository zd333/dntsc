import { Epic } from 'redux-observable';
import { searchInventoryItemsApiCallEpic } from './search-inventory-items-api-call.epic';

// Add all inventory state slice epics to this array and they will be combined/added to epic middleware
export const inventoryEpics: Array<Epic> = [searchInventoryItemsApiCallEpic];

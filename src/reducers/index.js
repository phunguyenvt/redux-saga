import { combineReducers } from 'redux';

import topicsReducer from './topics';
import categoryReducer from './category';

export default combineReducers({
	topicsReducer,
	categoryReducer,
});

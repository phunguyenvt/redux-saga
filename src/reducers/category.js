import {
	REQUEST_GET_CATEGORY,
	SUCCESS_GET_CATEGORY,
	ERROR_GET_CATEGORY
} from '../constants';

const initialState = {data: null, isLoading: false};

export default function setBrowserInfo(state = initialState, action) {
	switch (action.type) {
		case SUCCESS_GET_CATEGORY:
			return {
				...state,
				data: action.data,
				isLoading: action.isLoading,
			};
		case ERROR_GET_CATEGORY:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case REQUEST_GET_CATEGORY:
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
}

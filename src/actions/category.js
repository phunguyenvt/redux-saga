import {
	REQUEST_GET_CATEGORY,
	SUCCESS_GET_CATEGORY,
	ERROR_GET_CATEGORY
} from '../constants';

export function successGetCategory(data) {
	return {
		type: SUCCESS_GET_CATEGORY,
		data,
		isLoading: false
	};
}

export function errorGetCategory() {
	return {
		type: ERROR_GET_CATEGORY,
		isLoading: false,
	};
}

//Sagas
export function requestGetCategory() {
	return {
		type: REQUEST_GET_CATEGORY,
		isLoading: true,
	};
}

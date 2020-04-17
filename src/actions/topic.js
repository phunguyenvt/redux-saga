import {REQUEST_CREATE_TOPIC, SUCCESS_CREATE_TOPIC, ERROR_CREATE_TOPIC} from '../constants';

export function successCreateTopic(data) {
	return {
		type: SUCCESS_CREATE_TOPIC,
		data,
		isLoading: false
	};
}

export function errorCreateTopic() {
	return {
		type: ERROR_CREATE_TOPIC,
		isLoading: false,
	};
}

//Sagas
export function requestCreateTopic(form, callbackSuccess, callbackError) {
	return {
		type: REQUEST_CREATE_TOPIC,
		isLoading: true,
		form, callbackSuccess, callbackError
	};
}

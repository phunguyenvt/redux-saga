import {put, takeLatest, call} from 'redux-saga/effects';

import {
	REQUEST_GET_CATEGORY,
} from '../../constants';
import {errorGetCategory, successGetCategory} from '../../actions/category';
import {getCategory} from '../../lib/api';

function* workerGetCategorySaga() {
	const dataResponse = yield call(getCategory);
	console.log('dataResponse')
	if (dataResponse != null) {

		yield put(successGetCategory(dataResponse));
	} else {
		yield put(errorGetCategory());
	}
}

export default function* watchGetCategorySaga() {
	yield takeLatest(REQUEST_GET_CATEGORY, workerGetCategorySaga);
}

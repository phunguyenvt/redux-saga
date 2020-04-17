import { put, takeLatest, call } from 'redux-saga/effects';

import { REQUEST_CREATE_TOPIC } from '../../constants';
import { successCreateTopic, errorCreateTopic } from '../../actions/topic';
import { createTopic } from '../../lib/api';

function* workerCreateTopicSaga({form, callbackSuccess, callbackError}) {
  const dataResponse = yield call(createTopic);
	console.log(dataResponse)

  if(dataResponse != null && dataResponse.id != null){
	  yield put(successCreateTopic(dataResponse));
	  console.log('callbackSuccess', form, callbackSuccess, callbackError);
	  if (callbackSuccess) {
		  callbackSuccess(dataResponse)
	  }
  } else {
	  yield put(errorCreateTopic());
	  if (callbackError) {
		  callbackError(dataResponse)
	  }
  }
}

export default function* watchTopicsSaga() {
  yield takeLatest(REQUEST_CREATE_TOPIC, workerCreateTopicSaga);
}

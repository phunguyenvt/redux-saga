import { SUCCESS_CREATE_TOPIC, ERROR_CREATE_TOPIC, REQUEST_CREATE_TOPIC } from '../constants';

const initialState = { data: null, isLoading: false };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_CREATE_TOPIC:
      return {
        ...state,
        data: action.data,
        isLoading: action.isLoading,
      };
    case ERROR_CREATE_TOPIC:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case REQUEST_CREATE_TOPIC:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

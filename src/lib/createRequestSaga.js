import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  //console.log(type, SUCCESS, FAILURE);

  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  //console.log('request', request);
  return function*(action) {
    //console.log('action', action);
    //console.log('request', request);
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      //const header = response.headers;
      //console.log("response", response);
      //console.log("header", header);
      console.log();
      if(action.type === 'auth/LOGIN'){
        yield put({
          type: SUCCESS,
          payload: response
        });
      }else{
        yield put({
          type: SUCCESS,
          payload: response.data
        });
      }
      
      //console.log('success', response.data);
      //console.log('saga',response, request);
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
      //console.log('failre', e);
      //console.log('err',e);
    }
    yield put(finishLoading(type, action.payload)); // 로딩 끝
    //console.log('err',action.payload);
  };
}
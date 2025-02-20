import { put, takeLatest } from 'redux-saga/effects';
import { getData } from '../../utils/api';
import axios from 'axios';

import {
  FETCH_SWAP_TRANSACTION_LIST_REQUEST,
  fetchSwapTransactionListSuccess,
  fetchSwapTransactionListFail
} from '../actions/fetchSwapTrasactionAction';

function* fetchSwapTransactionList(action) {
  try {
    // Make an API request to fetch token data
    let pair = "0x2356d65ba95e9b8cbf5ff88841cb5a371dd6ec6a";
    if (action?.payload?.pair) {
      pair = action?.payload?.pair
    }
    const url = `https://swap-api.thetatoken.org/swap/pair/${pair}/transactions`
    console.log(url)
    const response = yield axios.get(url);

    // Dispatch success action with the received data
    yield put(fetchSwapTransactionListSuccess(response.data.body.transactions));
  } catch (error) {
    // Dispatch fail action with the error message
    yield put(fetchSwapTransactionListFail(error.message));
  }
}

// Watcher saga
function* swapTransactionSaga() {
  yield takeLatest(FETCH_SWAP_TRANSACTION_LIST_REQUEST, fetchSwapTransactionList);
}

export default swapTransactionSaga;

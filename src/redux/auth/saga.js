import { all, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";

import { getToken, clearToken } from "@iso/lib/helpers/utility";
import actions from "./actions";

const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* ({ payload }) {
    const { token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: "Profile",
      });
    } else {
      if (fakeApiCall) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: "secret token",
          profile: "Profile",
        });
      } else {
        yield put({ type: actions.LOGIN_ERROR });
      }
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem("id_token", payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push("/");
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get("idToken");
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: "Profile",
      });
    }
  });
}

/*
在 redux-saga 中，當在 yield 後接上 Promise 時，middleware 會把 Saga 停住，
   直到這個 Promise 被 resolve 後才繼續執行。
一旦 Promise 被 resolve 之後，middleware 會讓 Saga 繼續執行到下一次的 yield 才停住。
在 redux-saga 中會從 Generator 中產生（yield）許多的 JavaScript 物件，這些物件包含了指示，
   因此我們把這樣的物件稱作「effect」，這些物件的指示會告訴 middleware 現在要執行哪些動作
  （例如，執行非同步的函式、向 store 發出 dispatch 等等）。
在 redux-saga 中有許多不同的 effect（例如，put），effect 是一個帶有指示的物件，
   需要透過 middleware 來完成，當 middleware 收到 Saga 產生（yield）的 effect 時，Saga 會停住，
   和 Promise 的情況相似，需要直到這個 effect 被完成後才會繼續。
   也就是說，不論是 put 或 call 他們都沒有真正去執行 dispatch 或非同步的呼叫，
   他們只是回傳一個 JavaScript 物件：
Saga 可以透過很多不同的形式產生 effect，其中最簡單的一中方式就是 Promise。
*/
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}

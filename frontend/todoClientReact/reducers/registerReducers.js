import * as types from '../actions/types';
import appState from '../contants/initialState';

const registerReducer = (state = appState.register, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return { ...state, ...{ userInfo: action.data } }
        default:
            return state
    }
}
export default registerReducer
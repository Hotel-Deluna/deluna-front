import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const CHANGE_FIELD = 'auth/join/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/join/INITIALIZE_FORM';

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form,// user, partner
        key, // email, pwd, pwdcheck
        value //실제 바꾸려는 값
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);


const initialState = {//회원가입 key등록
    partner : {
        email : '',
        pwd : '',
        pwdcheck : '',
        phoneNum : '',

    },
    user : {
        eamil : '',
        pwd : '',
        pwdcheck : '',
        phoneNum : '',
    }
};

const authJoin = handleActions(
    //회원가입
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value }}) =>
        produce(state, draft => {
            draft[form][key] = value; //예 auth.join.user.email
        }),
        [INITIALIZE_FORM]: (state, { payload: { form }}) => ({
            ...state,
            [form]:initialState[form],
        }), 
    },
    initialState,
);

export default authJoin;
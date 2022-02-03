import { createStore } from 'redux';

const initialState = {
    email: '',
    password: '',
    nickname: '',
    passwordConfirm: '',
}

function reducer(state=initialState, action){
    if (action.type === 'ChangeEmail'){
        return {
            ...state,
            email : action.payload.email,
        }}
    if (action.type === 'ChangePassword'){
        return {
            ...state,
            password : action.payload.password,
        }}

    
    if (action.type === 'AddEmail'){
        return {
            ...state,
            email : action.payload.email,
        }}
    if (action.type === 'AddNickname'){
        return {
            ...state,
            nickname : action.payload.nickname,
        }}
    if (action.type === 'AddPassword'){
        return {
            ...state,
            password : action.payload.password,
        }}
    if (action.type === 'AddPasswordConfirm'){
        return {
            ...state,
            passwordConfirm : action.payload.passwordConfirm,
        }}

    return initialState;
}

const store = createStore(reducer);

export default store;
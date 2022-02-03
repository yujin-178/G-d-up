
// action creator : ChangeEmail 

export function IsLogin() {
    return {
        type: 'IsLogin',
    }
}

export function ChangeEmail(email) {
    return {
        type: 'ChangeEmail',
        payload: {
            email,
        }
    }
}

export function ChangePassword(password) {
    return {
        type: 'ChangePassword',
        payload: {
            password,
        }
    }
}

export function AddEmail(email){
    return{
        type:'AddEmail',
        payload:{
            email,
        }
    }
}
export function AddNickname(nickname){
    return{
        type:'AddNickname',
        payload:{
            nickname,
        }
    }
}
export function AddPassword(password){
    return{
        type:'AddPassword',
        payload:{
           password,
        }
    }
}
export function AddPasswordConfirm(passwordConfirm){
    return{
        type:'AddPasswordConfirm',
        payload:{
            passwordConfirm,
        }
    }
}
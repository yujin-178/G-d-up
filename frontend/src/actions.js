export function changeEmailField(email) {
  return {
    type: 'changeEmailField',
    payload: {
      email,
    },
  };
}

export function changePasswordField(password) {
  return {
    type: 'changePasswordField',
    payload: {
      password,
    },
  };
}

export function changemodalIsOpen(modalIsOpen){
  return{
    type: 'changemodalIsOpen',
    payload: {
      modalIsOpen,
    }
  };
}

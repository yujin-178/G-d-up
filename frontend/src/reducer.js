const initialState = {
  newId: 100,
  email: '',
  password: '',
  modalIsOpen : false,
};

export default function reducer(state = initialState, action) {
  if (action.type === 'changeEmailField') {
    return {
      ...state,
      email: action.payload.email,
    };
  }

  if (action.type === 'changePasswordField') {
    return {
      ...state,
      password: action.payload.password,
    };
  }

  if (action.type === 'changemodalIsOpen'){
    return{
      ...state,
      modalIsOpen : action.payload.modalIsOpen
    }
  }

  return state;
};
